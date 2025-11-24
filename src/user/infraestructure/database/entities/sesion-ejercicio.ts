// sesion-ejercicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Sesion } from './sesion';
import { Ejercicio } from './ejercicio.entity';

@Entity()
@Unique(['sesion', 'orden'])
export class SesionEjercicio {
    @PrimaryGeneratedColumn()
    sesion_ejercicio_id: number;

    @ManyToOne(() => Sesion, (s) => s.ejercicios)
    sesion: Sesion;

    @ManyToOne(() => Ejercicio)
    ejercicio: Ejercicio;

    @Column()
    orden: number;

    @Column()
    series: number;

    @Column()
    repeticiones: number;

    @Column()
    descanso_seg: number;
}
