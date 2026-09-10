import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create(createUserDto);

      await this.userRepository.save({
        ...userData,
        password: bcryptAdapter.hash(password),
      });

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error: any) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Email is not valid');
    }

    if (!bcryptAdapter.compare(password, user.password)) {
      throw new UnauthorizedException('Password is not valid');
    }

    // Generar JWT

    return {
      ...user,
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

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
