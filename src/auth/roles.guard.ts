import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { DataSource } from 'typeorm';
import { Request } from 'express';

// Estendemos a interface Request para incluir nosso usuário decodificado
interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Obtém os perfis necessários que foram definidos com o decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se nenhuma role é necessária, permite o acesso (apenas a autenticação é suficiente)
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtém o objeto da requisição, que já deve ter o usuário anexado pelo FirebaseAuthGuard
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const { user, params } = request;

    // 3. Busca o perfil do usuário no nosso banco de dados
    // Precisamos saber em qual ministério a ação está ocorrendo
    const ministerioId = params.id; // Assume que o ID do ministério está na URL
    if (!user || !ministerioId) {
      return false; // Não tem como verificar a permissão sem esses dados
    }

    const membroMinisterio = await this.dataSource.query(
      `SELECT perfil FROM membros_ministerio WHERE usuario_id = ? AND ministerio_id = ?`,
      [user.uid, ministerioId],
    );

    if (!membroMinisterio || membroMinisterio.length === 0) {
      return false; // Usuário não é membro deste ministério
    }

    const userProfile: Role = membroMinisterio[0].perfil;

    // 4. Compara o perfil do usuário com os perfis necessários
    return requiredRoles.some((role) => userProfile === role);
  }
}