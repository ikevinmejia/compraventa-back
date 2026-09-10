import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const car = this.carRepository.create(createCarDto);

      await this.carRepository.save(car);

      return car;
    } catch (error) {
      this.handleDBExceptions(error);
    }

    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    const update = updateCarDto;

    return `This action updates a #${id} ${update.brandId} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }

  private handleDBExceptions(error: unknown) {
    const dbError = error as { code?: unknown; detail?: unknown };

    if (dbError.code === '23505') {
      throw new BadRequestException(
        typeof dbError.detail === 'string' ? dbError.detail : undefined,
      );
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected server error, check logs',
    );
  }
}
