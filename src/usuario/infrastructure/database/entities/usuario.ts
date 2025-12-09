import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Preferencia } from './preferencia';
import { Progreso } from './progreso';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column()
  edad: number;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  peso_kg: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  altura_cm: number;

  @Column({ length: 20 })
  nivel: string;

  @Column({ nullable: true })
  condiciones_medicas: string;

  @Column({ nullable: true })
  objetivos: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  celular: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 500, nullable: true })
  refresh_token: string;

  @Column({ length: 50, default: 'usuario' })
  rol: string;

  @Column({ type: 'boolean', default: false })
  habeas_data_aceptado: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  fecha_habeas_data: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'boolean', default: true })
  is_activo: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  deleted_at: Date;

  @OneToOne(() => Preferencia, (p) => p.usuario)
  preferencia: Preferencia;

  @OneToMany(() => Progreso, (p) => p.usuario)
  progreso: Progreso[];
}
