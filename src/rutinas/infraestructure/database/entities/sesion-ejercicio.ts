import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Sesion } from './sesion';
import { Ejercicio } from './ejercicio';

@Entity('sesion_ejercicio')
@Unique(['sesion', 'orden'])
export class SesionEjercicio {
  @PrimaryGeneratedColumn({ name: 'sesion_ejercicio_id' })
  sesionEjercicioId: number;

  @ManyToOne(() => Sesion, (s) => s.ejercicios)
  @JoinColumn({ name: 'sesion_id' })
  sesion: Sesion;

  @ManyToOne(() => Ejercicio)
  @JoinColumn({ name: 'ejercicio_id' })
  ejercicio: Ejercicio;

  @Column()
  orden: number;

  @Column()
  series: number;

  @Column()
  repeticiones: number;

  @Column({ name: 'descanso_seg' })
  descansoSeg: number;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;

  @Column({ default: true, name: 'is_activo' })
  isActivo: boolean;
}
