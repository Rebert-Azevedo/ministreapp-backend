import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Igreja } from '../../igrejas/entities/igreja.entity';
import { MembroMinisterio } from './membro-ministerio.entity'; 

@Entity({ name: 'ministerios' })
export class Ministerio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'igreja_id' })
  igrejaId: number;

  @ManyToOne(() => Igreja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'igreja_id' })
  igreja: Igreja;

  @OneToMany(() => MembroMinisterio, (membro) => membro.ministerio)
  membros: MembroMinisterio[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}