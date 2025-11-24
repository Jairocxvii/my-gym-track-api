// rutina.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario';
import { Sesion } from './sesion';

@Entity()
export class Rutina {
    @PrimaryGeneratedColumn()
    rutina_id: number;

    @ManyToOne(() => Usuario, (u) => u.rutinas)
    usuario: Usuario;

    @Column({ length: 100, nullable: true })
    nombre: string;

    @Column({ type: 'date', default: () => 'current_date' })
    fecha_creacion: Date;

    @Column({ length: 50, nullable: true })
    tipo_division: string;

    @OneToMany(() => Sesion, (s) => s.rutina)
    sesiones: Sesion[];
}
