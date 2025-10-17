// src/igrejas/dto/create-igreja.dto.ts (COMPLETO)

import { IsString, IsNotEmpty, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIgrejaDto {
  @ApiProperty({
    description: 'O nome da igreja.',
    example: 'Igreja Batista Central',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(255)
  nome: string;

  @ApiProperty({
    description: 'CNPJ da igreja (opcional).',
    example: '12.345.678/0001-99',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(18)
  cnpj?: string;

  @ApiProperty({
    description: 'Endereço completo da igreja (opcional).',
    example: 'Rua Principal, 123, Centro',
    required: false,
  })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({
    description: 'Status da conta da igreja (opcional).',
    enum: ['ativo', 'inativo', 'teste'],
    default: 'ativo',
    required: false,
  })
  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'teste'])
  status?: string;
}