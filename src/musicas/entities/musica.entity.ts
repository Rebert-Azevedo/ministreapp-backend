import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Igreja } from '../../igrejas/entities/igreja.entity';

@Entity({ name: 'musicas' })
export class Musica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  artista: string;

  @Column({ name: 'tom_original', type: 'varchar', length: 10, nullable: true })
  tomOriginal: string;

  @Column({ type: 'int', nullable: true })
  bpm: number;

  @Column({ type: 'json', nullable: true })
  tags: object;

  @Column({ type: 'text', nullable: true })
  letra: string;

  @Column({ type: 'text', nullable: true })
  cifra: string;

  @Column({ name: 'letra_url', type: 'varchar', length: 2048, nullable: true })
  letraUrl: string;

  @Column({ name: 'cifra_url', type: 'varchar', length: 2048, nullable: true })
  cifraUrl: string;

  @Column({ name: 'youtube_url', type: 'varchar', length: 2048, nullable: true })
  youtubeUrl: string;

  @Column({ name: 'spotify_url', type: 'varchar', length: 2048, nullable: true })
  spotifyUrl: string;

  // --- Relacionamento com Igreja ---
  @Column({ name: 'igreja_id' })
  igrejaId: number;

  @ManyToOne(() => Igreja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'igreja_id' })
  igreja: Igreja;
  // ------------------------------------

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}