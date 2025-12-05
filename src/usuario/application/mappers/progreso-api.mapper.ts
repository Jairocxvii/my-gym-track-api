import { ProgresoResponseDto } from '../dtos/progreso-response.dto';
import { ProgresoEntity } from '../../domain/entities/progreso.entity';

export class ProgresoApiMapper {
  static toResponse(domain: ProgresoEntity): ProgresoResponseDto {
    return {
      fecha: domain.fecha,
      pesoKg: domain.pesoKg,
      medidas: domain.medidas,
      notas: domain.notas,
    };
  }
}
