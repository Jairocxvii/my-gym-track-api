// ejercicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('ejercicio')
export class Ejercicio {
  @PrimaryGeneratedColumn()
  ejercicio_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, nullable: true })
  categoria: string;

  @Column({ length: 100, nullable: true })
  musculo_principal: string;

  @Column({ default: false })
  is_deleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  is_activo: boolean;
}
