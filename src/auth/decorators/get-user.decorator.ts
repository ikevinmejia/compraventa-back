import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  // * La data son los argumentos del decorador => @GetUser(...)
  // * Contexto o ctx es información de la Request.

  const req = ctx.switchToHttp().getRequest();

  const user = req.user;

  if (!user) throw new InternalServerErrorException('User not found (request)');

  if (data) {
    return user[data];
  }

  return user;
});
