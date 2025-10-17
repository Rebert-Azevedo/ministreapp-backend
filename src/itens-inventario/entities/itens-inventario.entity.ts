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

@Entity({ name: 'itens_inventario' })
export class ItemInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'int', default: 1 })
  quantidade: number;

  @Column({
    type: 'enum',
    enum: ['bom', 'reparo_necessario', 'quebrado'],
    default: 'bom',
  })
  condicao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  localizacao: string;

  @Column({ name: 'data_aquisicao', type: 'date', nullable: true })
  dataAquisicao: Date;

  @Column({ name: 'valor_aquisicao', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorAquisicao: number;

  // --- Relacionamento com Ministerio ---
  @Column({ name: 'ministerio_id' })
  ministerioId: number;

  @ManyToOne(() => Ministerio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ministerio_id' })
  ministerio: Ministerio;
  // ------------------------------------

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}