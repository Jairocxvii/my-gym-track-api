// sesion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Rutina } from './rutina';
import { SesionEjercicio } from './sesion-ejercicio';

@Entity('sesion')
@Unique(['rutina', 'dia_orden'])
export class Sesion {
  @PrimaryGeneratedColumn()
  sesion_id: number;

  @ManyToOne(() => Rutina, (r) => r.sesiones)
  rutina: Rutina;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @Column()
  dia_orden: number;

  @OneToMany(() => SesionEjercicio, (se) => se.sesion)
  ejercicios: SesionEjercicio[];
}
