import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptAdapter } from '../plugins/bcryptAdapter';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const user = this.userRepository.create({
      ...userData,
      password: bcryptAdapter.hash(password),
    });

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, roles: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid'); // * Email no valido
    }

    if (!bcryptAdapter.compare(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid'); // * Contraseña no valida
    }

    // Generar JWT

    const { password: _, ...rest } = user;

    return {
      ...rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

  checkAuthStatus(user: User) {
    // Tomar el usuario de la petición
    // Obtener id
    // Con ese id retornar el nuevo JWT
    // retornar el objeto con: id, email, fullName, password, token

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}
