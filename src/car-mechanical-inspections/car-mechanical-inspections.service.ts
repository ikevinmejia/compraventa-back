import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarMechanicalInspectionDto } from './dto/create-car-mechanical-inspection.dto';
import { UpdateCarMechanicalInspectionDto } from './dto/update-car-mechanical-inspection.dto';
import { CarMechanicalInspection } from './entities/car-mechanical-inspection.entity';

@Injectable()
export class CarMechanicalInspectionsService {
  constructor(
    @InjectRepository(CarMechanicalInspection)
    private readonly carMechanicalInspRepo: Repository<CarMechanicalInspection>,
  ) {}

  async create(
    carId: string,
    createCarMechanicalInspectionDto: CreateCarMechanicalInspectionDto,
  ) {
    const existing = await this.carMechanicalInspRepo.findOne({
      where: { car: { id: carId } },
    });

    if (existing) {
      return this.update(carId, createCarMechanicalInspectionDto);
    }

    const carInspection = this.carMechanicalInspRepo.create({
      ...createCarMechanicalInspectionDto,
      car: { id: carId },
    });

    return await this.carMechanicalInspRepo.save(carInspection);
  }

  async findAll() {
    return await this.carMechanicalInspRepo.find({
      relations: { car: true },
    });
  }

  async findOne(id: string) {
    const carInspection = await this.carMechanicalInspRepo.findOne({
      where: [{ id }, { car: { id } }],
    });

    if (!carInspection) {
      throw new NotFoundException(`Car inspection with id ${id} not found`);
    }

    return carInspection;
  }
  async update(
    carId: string,
    updateCarMechanicalInspectionDto: UpdateCarMechanicalInspectionDto,
  ) {
    const existing = await this.carMechanicalInspRepo.findOne({
      where: { car: { id: carId } },
    });

    if (!existing) {
      const created = this.carMechanicalInspRepo.create({
        ...updateCarMechanicalInspectionDto,
        car: { id: carId },
      });
      return await this.carMechanicalInspRepo.save(created);
    }

    const cleanDto = { ...updateCarMechanicalInspectionDto } as Record<
      string,
      unknown
    >;
    delete cleanDto.id;
    delete cleanDto.carId;
    delete cleanDto.car;

    this.carMechanicalInspRepo.merge(existing, cleanDto);
    return await this.carMechanicalInspRepo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.carMechanicalInspRepo.findOne({
      where: [{ id }, { car: { id } }],
    });

    if (!existing) {
      throw new NotFoundException(`Car inspection with id ${id} not found`);
    }

    await this.carMechanicalInspRepo.remove(existing);
    return { message: `car inspection with id ${id} removed` };
  }
}
