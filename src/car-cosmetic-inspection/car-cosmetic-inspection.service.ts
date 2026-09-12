import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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

  async findAll() {
    try {
      const items = await this.carCosmeticInspectionRepo.find();
      return items;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.carCosmeticInspectionRepo.findOneBy({ id });

      if (!item) {
        throw new NotFoundException(
          `cosmetic inspection with id #${id} not found`,
        );
      }

      return item;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(
    id: string,
    updateCarCosmeticInspectionDto: UpdateCarCosmeticInspectionDto,
  ) {
    const result = await this.carCosmeticInspectionRepo.update(id, {
      ...updateCarCosmeticInspectionDto,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `cosmetic inspection with id #${id} not found`,
      );
    }

    return `cosmetic inspection updated!`;
  }

  remove(id: string) {
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
