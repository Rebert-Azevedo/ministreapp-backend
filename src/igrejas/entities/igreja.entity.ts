import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'igrejas' })
export class Igreja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 18, unique: true, nullable: true })
  cnpj: string;

  @Column({ type: 'text', nullable: true })
  endereco: string;

  @Column({ name: 'contato_telefone', type: 'varchar', length: 20, nullable: true })
  contatoTelefone: string;

  @Column({ name: 'contato_email', type: 'varchar', length: 255, nullable: true })
  contatoEmail: string;

  @Column({ name: 'plano_assinatura', type: 'varchar', length: 50, default: 'basico' })
  planoAssinatura: string;

  @Column({
    type: 'enum',
    enum: ['ativo', 'inativo', 'teste'],
    default: 'ativo',
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}