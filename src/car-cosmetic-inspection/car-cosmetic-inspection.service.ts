import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarCosmeticInspectionDto } from './dto/create-car-cosmetic-inspection.dto';
import { UpdateCarCosmeticInspectionDto } from './dto/update-car-cosmetic-inspection.dto';
import { CarCosmeticInspection } from './entities/car-cosmetic-inspection.entity';

@Injectable()
export class CarCosmeticInspectionService {
  private readonly logger = new Logger('CarCosmeticInspectionService');
  constructor(
    @InjectRepository(CarCosmeticInspection)
    private readonly carCosmeticInspectionRepo: Repository<CarCosmeticInspection>,
  ) {}

  async create(
    carId: string,
    createCarCosmeticInspectionDto: CreateCarCosmeticInspectionDto,
  ) {
    const car = this.carCosmeticInspectionRepo.create({
      carId,
      ...createCarCosmeticInspectionDto,
    });

    try {
      await this.carCosmeticInspectionRepo.save(car);

      return car;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all carCosmeticInspection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carCosmeticInspection`;
  }

  update(
    id: number,
    updateCarCosmeticInspectionDto: UpdateCarCosmeticInspectionDto,
  ) {
    return `This action updates a #${id} carCosmeticInspection`;
  }

  remove(id: number) {
    return `This action removes a #${id} carCosmeticInspection`;
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
