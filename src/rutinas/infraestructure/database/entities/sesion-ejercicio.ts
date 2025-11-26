// sesion-ejercicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Sesion } from './sesion';

@Entity("sesion_ejercicio")
@Unique(['sesion', 'orden'])
export class SesionEjercicio {
    @PrimaryGeneratedColumn()
    sesion_ejercicio_id: number;

    @ManyToOne(() => Sesion, (s) => s.ejercicios)
    sesion: Sesion;

    @Column({ name: 'ejercicio_id' })
    ejercicioId: number;

    @Column()
    orden: number;

    @Column()
    series: number;

    @Column()
    repeticiones: number;

    @Column()
    descanso_seg: number;
}
