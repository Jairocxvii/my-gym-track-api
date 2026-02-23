// equipamiento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('equipamiento')
export class Equipamiento {
  @PrimaryGeneratedColumn()
  equipamiento_id: number;

  @Column({ length: 50, unique: true })
  descripcion: string;

  @Column({ default: false })
  is_deleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  is_activo: boolean;
}
