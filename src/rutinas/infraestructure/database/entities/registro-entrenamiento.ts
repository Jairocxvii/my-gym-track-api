// registro-entrenamiento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sesion } from './sesion';
import { SesionEjercicio } from './sesion-ejercicio';

@Entity('registro_entrenamiento')
export class RegistroEntrenamiento {
  @PrimaryGeneratedColumn()
  registro_id: number;
  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Sesion)
  sesion: Sesion;

  @ManyToOne(() => SesionEjercicio)
  sesion_ejercicio: SesionEjercicio;

  @Column({ type: 'date', default: () => 'current_date' })
  fecha: Date;

  @Column()
  series_realizadas: number;

  @Column()
  repeticiones_realizadas: number;

  @Column({ type: 'numeric', precision: 6, scale: 2 })
  peso_utilizado_kg: number;
}
