// ejercicio-equipamiento.entity.ts
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ejercicio } from './ejercicio';
import { Equipamiento } from './equipamiento';

@Entity()
export class EjercicioEquipamiento {
    @PrimaryColumn()
    ejercicio_id: number;

    @PrimaryColumn()
    equipamiento_id: number;

    @ManyToOne(() => Ejercicio)
    ejercicio: Ejercicio;

    @ManyToOne(() => Equipamiento)
    equipamiento: Equipamiento;
}
