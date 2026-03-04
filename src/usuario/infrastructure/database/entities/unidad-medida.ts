import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('unidad_medida')
export class UnidadMedida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 10, nullable: true })
    abreviatura: string;

    @Column({ default: false })
    is_deleted: boolean;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;

    @Column({ default: true })
    is_activo: boolean;
}
