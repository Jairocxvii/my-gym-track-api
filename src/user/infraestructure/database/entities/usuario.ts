// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Preferencia } from './preferencia';
import { Progreso } from './progreso';
import { Rutina } from './rutina';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column()
    edad: number;

    @Column({ type: 'char', length: 1 })
    sexo: string;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    peso_kg: number;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    altura_cm: number;

    @Column({ length: 20 })
    nivel: string;

    @Column({ nullable: true })
    condiciones_medicas: string;

    @Column({ nullable: true })
    objetivos: string;

    @Column({ type: 'timestamptz', default: () => 'now()' })
    created_at: Date;

    @Column({ type: 'timestamptz', default: () => 'now()' })
    updated_at: Date;

    @OneToOne(() => Preferencia, (p) => p.usuario)
    preferencia: Preferencia;

    @OneToMany(() => Progreso, (p) => p.usuario)
    progreso: Progreso[];

    @OneToMany(() => Rutina, (r) => r.usuario)
    rutinas: Rutina[];
}
