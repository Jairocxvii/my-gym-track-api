import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { UnidadMedida } from './unidad-medida';

@Entity('tipo_objetivo')
export class TipoObjetivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ name: 'unidad_medida_id' })
    unidad_medida_id: number;

    @ManyToOne(() => UnidadMedida)
    @JoinColumn({ name: 'unidad_medida_id' })
    unidad_medida: UnidadMedida;

    @Column({ default: false })
    is_deleted: boolean;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @Column({ default: true })
    is_activo: boolean;
}

