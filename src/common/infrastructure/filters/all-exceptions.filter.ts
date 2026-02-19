import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundException } from '../../domain/exceptions/entity-not-found.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Ocurrió un error inesperado';
        let error = 'Internal Server Error';

        if (exception instanceof EntityNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
            error = 'Not Found';
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseBody = exception.getResponse();
            message = (responseBody as any).message || exception.message;
            error = (responseBody as any).error || 'Error';
        } else if (exception instanceof Error) {
            message = 'Error interno del servidor';
            error = 'Internal Server Error';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            error,
        });
    }
}
