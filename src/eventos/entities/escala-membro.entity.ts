import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Evento } from './eventos.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Funcao } from '../../funcoes/entities/funcao.entity';

@Entity({ name: 'escalas_membros' })
@Unique(['eventoId', 'usuarioId']) // Garante que um usuário não seja escalado duas vezes no mesmo evento
export class EscalaMembro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'evento_id' })
  eventoId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ name: 'funcao_id' })
  funcaoId: number;

  @ManyToOne(() => Evento, (evento) => evento.escala, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'evento_id' })
  evento: Evento;

  @ManyToOne(() => Usuario, { eager: true }) // eager: true carrega os dados do usuário automaticamente ao buscar a escala
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Funcao, { eager: true }) // eager: true carrega os dados da função automaticamente ao buscar a escala
  @JoinColumn({ name: 'funcao_id' })
  funcao: Funcao;
}