export class UsuarioEntity {
    id: number;
    nombre: string;
    edad: number;
    sexo: string;
    pesoKg: number;
    alturaCm: number;
    nivel: string;
    email: string;
    celular: string;
    passwordHash: string;
    rol: string;
    habeasDataAceptado: boolean;
    isDeleted: boolean;
    condicionesMedicas?: string;
    objetivos?: string;
    refreshToken?: string;
    fechaHabeasData?: Date;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: Partial<UsuarioEntity>) {
        Object.assign(this, props);
    }
}