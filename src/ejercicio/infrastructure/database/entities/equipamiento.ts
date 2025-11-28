// equipamiento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("equipamiento")
export class Equipamiento {
    @PrimaryGeneratedColumn()
    equipamiento_id: number;

    @Column({ length: 50, unique: true })
    descripcion: string;
}
