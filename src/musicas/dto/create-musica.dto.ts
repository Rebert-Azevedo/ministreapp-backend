import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateMusicaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  artista?: string;

  @IsOptional()
  @IsString()
  tomOriginal?: string;

  @IsOptional()
  @IsInt()
  bpm?: number;

  @IsNumber()
  @IsNotEmpty()
  igrejaId: number;
}