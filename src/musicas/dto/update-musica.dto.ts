// Praticamente todos os campos podem ser atualizados
export class UpdateMusicaDto {
  titulo?: string;
  artista?: string;
  tomOriginal?: string;
  bpm?: number;
  tags?: object;
  letra?: string;
  cifra?: string;
  letraUrl?: string;
  cifraUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}