// sesion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, DeleteDateColumn, JoinColumn } from 'typeorm';
import { Rutina } from './rutina';
import { SesionEjercicio } from './sesion-ejercicio';

@Entity('sesion')
@Unique(['rutina', 'dia_orden'])
export class Sesion {
  @PrimaryGeneratedColumn()
  sesion_id: number;

  @Column({ name: 'rutina_id' })
  rutina_id: number;

  @ManyToOne(() => Rutina)
  @JoinColumn({ name: 'rutina_id' })
  rutina: Rutina;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @Column()
  dia_orden: number;

  @OneToMany(() => SesionEjercicio, (se) => se.sesion)
  ejercicios: SesionEjercicio[];

  @Column({ default: false })
  is_deleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  is_activo: boolean;
}
