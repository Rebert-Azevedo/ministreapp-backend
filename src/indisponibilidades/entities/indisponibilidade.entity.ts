import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'indisponibilidades_usuario' })
export class Indisponibilidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data_inicio', type: 'date' })
  dataInicio: Date;

  @Column({ name: 'data_fim', type: 'date' })
  dataFim: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  motivo: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}