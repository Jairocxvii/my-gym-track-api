import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Objetivo } from './objetivo';
import { UnidadMedida } from './unidad-medida';
import { Usuario } from './usuario';

@Entity('actividad')
export class Actividad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'objetivo_id' })
    objetivo_id: number;

    @Column({ name: 'usuario_id' })
    usuario_id: number;

    @Column({ name: 'unidad_medida_id' })
    unidad_medida_id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    valor_especifico: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creado_en: Date;

    @Column({ default: false })
    is_deleted: boolean;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @Column({ default: true })
    is_activo: boolean;

    @ManyToOne(() => Objetivo)
    @JoinColumn({ name: 'objetivo_id' })
    objetivo: Objetivo;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => UnidadMedida)
    @JoinColumn({ name: 'unidad_medida_id' })
    unidad_medida: UnidadMedida;
}

