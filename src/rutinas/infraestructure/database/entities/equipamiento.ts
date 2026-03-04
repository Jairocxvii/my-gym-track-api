// equipamiento.ts
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('equipamiento')
export class Equipamiento {
    @PrimaryGeneratedColumn({ name: 'equipamiento_id' })
    equipamientoId: number;

    @Column({ length: 50, unique: true })
    descripcion: string;

    @Column({ default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
    deletedAt: Date;

    @Column({ default: true, name: 'is_activo' })
    isActivo: boolean;
}
