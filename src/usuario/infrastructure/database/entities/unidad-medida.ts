import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidad_medida')
export class UnidadMedida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 10, nullable: true })
    abreviatura: string;
}
