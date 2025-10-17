import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Evento } from './eventos.entity';
import { Musica } from '../../musicas/entities/musica.entity';

@Entity({ name: 'repertorio_evento' })
@Unique(['eventoId', 'musicaId']) // Garante que uma música não seja adicionada duas vezes no mesmo evento
export class RepertorioEvento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'evento_id' })
  eventoId: number;

  @Column({ name: 'musica_id' })
  musicaId: number;

  @Column({ name: 'ordem_musica' })
  ordemMusica: number;

  @Column({ name: 'tom_execucao', type: 'varchar', length: 10, nullable: true })
  tomExecucao: string;

  @ManyToOne(() => Evento, (evento) => evento.repertorio, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evento_id' })
  evento: Evento;

  @ManyToOne(() => Musica, { eager: true }) // eager: true carrega os dados da música automaticamente ao buscar o repertório
  @JoinColumn({ name: 'musica_id' })
  musica: Musica;
}