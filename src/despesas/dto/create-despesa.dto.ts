export class CreateDespesaDto {
  descricao: string;
  categoria?: string;
  valor: number;
  ministerioId: number;
  solicitanteUsuarioId: string; // O ID do usuário logado que está fazendo a solicitação
}