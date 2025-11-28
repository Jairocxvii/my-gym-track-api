// progreso.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario';

@Entity("progreso")
export class Progreso {
    @PrimaryGeneratedColumn()
    progreso_id: number;
    @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
    @Column({ type: 'date', default: () => 'current_date' })
    fecha: Date;

    @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
    peso_kg: number;

    @Column({ type: 'jsonb', nullable: true })
    medidas: any;

    @Column({ nullable: true })
    notas: string;

    @Column({ type: 'timestamptz', default: () => 'now()' })
    created_at: Date;
}
