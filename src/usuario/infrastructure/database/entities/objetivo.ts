import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Usuario } from './usuario';
import { TipoObjetivo } from './tipo-objetivo';

@Entity('objetivo')
export class Objetivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'usuario_id' })
    usuario_id: number;

    @Column({ name: 'tipo_objetivo_id' })
    tipo_objetivo_id: number;

    @Column({ length: 150, nullable: true })
    nombre_personalizado: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    valor_meta_total: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fecha_inicio: Date;

    @Column({ type: 'date', nullable: true })
    fecha_limite: Date;

    @Column({ default: false })
    completado: boolean;

    @Column({ default: false })
    is_deleted: boolean;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @Column({ default: true })
    is_activo: boolean;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => TipoObjetivo)
    @JoinColumn({ name: 'tipo_objetivo_id' })
    tipo_objetivo: TipoObjetivo;
}

