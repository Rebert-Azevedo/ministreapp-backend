export class CreateMusicaDto {
  titulo: string;
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
  igrejaId: number;
}