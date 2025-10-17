import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ministerio } from '../../ministerios/entities/ministerio.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'despesas' })
export class Despesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @Column({
    type: 'enum',
    enum: ['pendente', 'aprovada', 'rejeitada'],
    default: 'pendente',
  })
  status: string;

  // --- Relacionamentos ---
  @Column({ name: 'ministerio_id' })
  ministerioId: number;

  @Column({ name: 'solicitante_usuario_id' })
  solicitanteUsuarioId: string;

  @Column({ name: 'aprovador_usuario_id', nullable: true })
  aprovadorUsuarioId: string;

  @ManyToOne(() => Ministerio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ministerio_id' })
  ministerio: Ministerio;

  @ManyToOne(() => Usuario, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'solicitante_usuario_id' })
  solicitante: Usuario;

  @ManyToOne(() => Usuario, { eager: true, onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'aprovador_usuario_id' })
  aprovador: Usuario;
  // -----------------------

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}