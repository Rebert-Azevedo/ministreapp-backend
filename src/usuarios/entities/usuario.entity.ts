import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Igreja } from '../../igrejas/entities/igreja.entity';
import { MembroMinisterio } from '../../ministerios/entities/membro-ministerio.entity'; 

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryColumn({ type: 'varchar', length: 128 })
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: 'igreja_id' })
  igrejaId: number;

  @ManyToOne(() => Igreja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'igreja_id' })
  igreja: Igreja;

  @OneToMany(() => MembroMinisterio, (membro) => membro.usuario)
  participacoes: MembroMinisterio[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}