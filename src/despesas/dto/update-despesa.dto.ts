export class UpdateDespesaDto {
  status: 'aprovada' | 'rejeitada';
  aprovadorUsuarioId: string; // O ID do líder que está aprovando/rejeitando
}