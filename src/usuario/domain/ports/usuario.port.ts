import { UsuarioEntity } from "../entities/usuario.entity";
import { GenericRepositoryPort } from "./generic-repository.port";


export abstract class UsuarioPort extends GenericRepositoryPort<UsuarioEntity, number> {
}

export const USUARIO_PORT = Symbol('USUARIO_PORT');