// src/eventos/entities/evento.entity.ts (CORRIGIDO)

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany, // 1. Importe o OneToMany
} from 'typeorm';
import { Ministerio } from '../../ministerios/entities/ministerio.entity';
import { EscalaMembro } from './escala-membro.entity'; // 2. Importe as novas entidades
import { RepertorioEvento } from './repertorio-evento.entity';

@Entity({ name: 'eventos' })
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'datetime', nullable: false })
  data_evento: Date;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({
    type: 'enum',
    enum: ['planejado', 'confirmado', 'cancelado'],
    default: 'planejado',
  })
  status: string;

  @Column({ name: 'ministerio_id' })
  ministerioId: number;

  @ManyToOne(() => Ministerio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ministerio_id' })
  ministerio: Ministerio;

  // --- 3. ADICIONE ESTAS DUAS PROPRIEDADES QUE ESTAVAM FALTANDO ---
  @OneToMany(() => EscalaMembro, (escala) => escala.evento)
  escala: EscalaMembro[];

  @OneToMany(() => RepertorioEvento, (repertorio) => repertorio.evento)
  repertorio: RepertorioEvento[];
  // -----------------------------------------------------------

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}