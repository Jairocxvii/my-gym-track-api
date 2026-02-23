// ejercicio-equipamiento.entity.ts
import { Entity, ManyToOne, PrimaryColumn, Column, DeleteDateColumn } from 'typeorm';
import { Ejercicio } from './ejercicio';
import { Equipamiento } from './equipamiento';

@Entity('ejercicio_equipamiento')
export class EjercicioEquipamiento {
  @PrimaryColumn()
  ejercicio_id: number;

  @PrimaryColumn()
  equipamiento_id: number;

  @ManyToOne(() => Ejercicio)
  ejercicio: Ejercicio;

  @ManyToOne(() => Equipamiento)
  equipamiento: Equipamiento;

  @Column({ default: false })
  is_deleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  is_activo: boolean;
}
