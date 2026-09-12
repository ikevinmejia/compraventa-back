import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarCosmeticInspectionDto } from './dto/create-car-cosmetic-inspection.dto';
import { UpdateCarCosmeticInspectionDto } from './dto/update-car-cosmetic-inspection.dto';
import { CarCosmeticInspection } from './entities/car-cosmetic-inspection.entity';

@Injectable()
export class CarCosmeticInspectionService {
  constructor(
    @InjectRepository(CarCosmeticInspection)
    private readonly carCosmeticInspectionRepo: Repository<CarCosmeticInspection>,
  ) {}

  async create(
    carId: string,
    createCarCosmeticInspectionDto: CreateCarCosmeticInspectionDto,
  ) {
    const car = this.carCosmeticInspectionRepo.create({
      ...createCarCosmeticInspectionDto,
      carId,
    });

    await this.carCosmeticInspectionRepo.save(car);

    return car;
  }

  async findAll() {
    const items = await this.carCosmeticInspectionRepo.find();
    return items;
  }

  async findOne(id: string) {
    const item = await this.carCosmeticInspectionRepo.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(
        `cosmetic inspection with id #${id} not found`,
      );
    }

    return item;
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
}
