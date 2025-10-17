import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'; 
import { FIREBASE_ADMIN } from '../firebase/firebase.module';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(@Inject(FIREBASE_ADMIN) private readonly firebase: App) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    try {
      // 2. USE getAuth(this.firebase) PARA ACESSAR O SERVIÇO DE AUTENTICAÇÃO
      const decodedToken = await getAuth(this.firebase).verifyIdToken(token);

      request['user'] = decodedToken;
    } catch (error) {
      console.error('Erro ao verificar o token do Firebase:', error);
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}