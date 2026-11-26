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
      car: { id: carId },
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
    carId: string,
    updateCarCosmeticInspectionDto: UpdateCarCosmeticInspectionDto,
  ) {
    const existing = await this.carCosmeticInspectionRepo.findOne({
      where: { car: { id: carId } },
    });

    if (!existing) {
      const created = this.carCosmeticInspectionRepo.create({
        ...updateCarCosmeticInspectionDto,
        car: { id: carId },
      });

      return await this.carCosmeticInspectionRepo.save(created);
    }

    const cleanDto = { ...updateCarCosmeticInspectionDto } as Record<
      string,
      unknown
    >;

    delete cleanDto.id;
    delete cleanDto.carId;
    delete cleanDto.car;

    this.carCosmeticInspectionRepo.merge(existing, cleanDto);
    return await this.carCosmeticInspectionRepo.save(existing);
  }

  remove(id: string) {
    return { message: `This action removes a #${id} carCosmeticInspection` };
  }
}
