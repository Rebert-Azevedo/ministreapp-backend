import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Igreja } from '../../igrejas/entities/igreja.entity';

@Entity({ name: 'funcoes' })
@Unique(['nome', 'igrejaId'])
export class Funcao { // CORRIGIDO: Funcoe -> Funcao
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'igreja_id' })
  igrejaId: number;

  @ManyToOne(() => Igreja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'igreja_id' })
  igreja: Igreja;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}