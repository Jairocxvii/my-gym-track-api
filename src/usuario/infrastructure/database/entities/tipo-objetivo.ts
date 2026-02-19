import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
}

