// rutina.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sesion } from './sesion';

@Entity('rutina')
export class Rutina {
    @PrimaryGeneratedColumn({ name: 'rutina_id' })
    rutinaId: number;

    /* FK hacia otro BC → solo número, sin relación TypeORM */
    @Column({ name: 'usuario_id' })
    usuarioId: number;

    @Column({ length: 100, nullable: true })
    nombre: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE', name: 'fecha_creacion' })
    fechaCreacion: Date;

    @Column({ length: 50, nullable: true, name: 'tipo_division' })
    tipoDivision: string;

    /* intra-módulo */
    @OneToMany(() => Sesion, (s) => s.rutina, { cascade: true })
    sesiones: Sesion[];
}
