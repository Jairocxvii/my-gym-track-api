// ejercicio.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';
import { Equipamiento } from './equipamiento';

@Entity('ejercicio')
export class Ejercicio {
    @PrimaryGeneratedColumn({ name: 'ejercicio_id' })
    ejercicioId: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 50, nullable: true })
    categoria: string;

    @Column({ length: 100, nullable: true, name: 'musculo_principal' })
    musculoPrincipal: string;

    @ManyToMany(() => Equipamiento)
    @JoinTable({
        name: 'ejercicio_equipamiento',
        joinColumn: { name: 'ejercicio_id', referencedColumnName: 'ejercicioId' },
        inverseJoinColumn: { name: 'equipamiento_id', referencedColumnName: 'equipamientoId' },
    })
    equipamiento: Equipamiento[];

    @Column({ default: false, name: 'is_deleted' })
    isDeleted: boolean;

    @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
    deletedAt: Date;

    @Column({ default: true, name: 'is_activo' })
    isActivo: boolean;
}
