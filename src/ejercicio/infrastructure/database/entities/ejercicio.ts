// ejercicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("ejercicio")
export class Ejercicio {
    @PrimaryGeneratedColumn()
    ejercicio_id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 50, nullable: true })
    categoria: string;

    @Column({ length: 100, nullable: true })
    musculo_principal: string;
}
