import { UsuarioResponseDto } from '../dtos/usuario-response.dto';
import { UsuarioEntity } from '../../domain/entities/usuario.entity';

export class UsuarioApiMapper {
  static toResponse(domain: UsuarioEntity): UsuarioResponseDto {
    return {
      id: domain.id,
      nombre: domain.nombre,
      edad: domain.edad,
      sexo: domain.sexo,
      pesoKg: domain.pesoKg,
      alturaCm: domain.alturaCm,
      nivel: domain.nivel,
      email: domain.email,
      celular: domain.celular,
      condicionesMedicas: domain.condicionesMedicas,
      objetivos: domain.objetivos,
      creadoEn: domain.createdAt,
      actualizadoEn: domain.updatedAt,
    };
  }
}
