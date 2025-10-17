export class CreateEventoDto {
  titulo: string;
  data_evento: Date;
  descricao?: string;
  status?: 'planejado' | 'confirmado' | 'cancelado';
  ministerioId: number;
}