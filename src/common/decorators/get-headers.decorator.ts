import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

export const RawHeaders = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    // * La data son los argumentos del decorador => @GetUser(...)
    // * Contexto o ctx es información de la Request.

    const req = ctx.switchToHttp().getRequest<Request>();
    const headers = req.rawHeaders;

    if (!headers)
      throw new InternalServerErrorException('Headers not found (request)');

    return headers;
  },
);
