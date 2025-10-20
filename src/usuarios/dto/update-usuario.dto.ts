import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

// A classe PartialType herda todas as regras de validação do CreateEventoDto
// e automaticamente torna cada uma delas opcional (@IsOptional()).
// Isso é perfeito para uma operação de PATCH, onde o usuário pode enviar
// apenas um, dois, ou todos os campos para serem atualizados.
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}