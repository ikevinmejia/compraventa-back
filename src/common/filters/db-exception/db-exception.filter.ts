import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError, HttpException) // qué tipos de errores captura este filtro
export class DbExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('DBExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Caso 1: ya es un error controlado de Nest (BadRequestException, NotFoundException, etc.)
    // Simplemente lo dejamos pasar tal cual, con su status y mensaje originales.

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return response.status(status).json(exceptionResponse);
    }

    // Caso 2: es un error de TypeORM/Postgres sin manejar todavía

    if (exception instanceof QueryFailedError) {
      const dbError = exception as unknown as {
        code?: string;
        detail?: string;
      };

      if (dbError.code === '23505') {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            dbError.detail ?? 'Duplicate value violates unique constraint',
        });
      }

      // Cualquier otro código de error de Postgres que no hayas mapeado explícitamente
      this.logger.error(exception);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected server error, check logs',
      });
    }
  }
}
