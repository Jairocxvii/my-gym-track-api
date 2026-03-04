// preferencia.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Usuario } from './usuario';

@Entity('preferencia')
export class Preferencia {
  @PrimaryGeneratedColumn()
  preferencia_id: number;

  @OneToOne(() => Usuario, (u) => u.preferencia)
  @JoinColumn()
  usuario: Usuario;

  @Column({ nullable: true })
  ejercicios_favoritos: string;

  @Column({ nullable: true })
  ejercicios_a_evitar: string;

  @Column({ default: false })
  is_deleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @Column({ default: true })
  is_activo: boolean;
}
