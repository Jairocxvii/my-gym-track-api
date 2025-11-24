// equipamiento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Equipamiento {
    @PrimaryGeneratedColumn()
    equipamiento_id: number;

    @Column({ length: 50, unique: true })
    descripcion: string;
}
