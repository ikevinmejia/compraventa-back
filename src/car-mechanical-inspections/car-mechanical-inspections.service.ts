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
    const carInspection = this.carMechanicalInspRepo.create({
      ...createCarMechanicalInspectionDto,
      carId,
    });

    await this.carMechanicalInspRepo.save(carInspection);

    return carInspection;
  }

  async findAll() {
    const carInspections = await this.carMechanicalInspRepo.find({});

    return carInspections;
  }

  async findOne(id: string) {
    const carInpection = await this.carMechanicalInspRepo.findOneBy({ id });

    if (!carInpection) {
      throw new NotFoundException(`Car inspection with id ${id} not found`);
    }

    return carInpection;
  }

  async update(
    id: string,
    updateCarMechanicalInspectionDto: UpdateCarMechanicalInspectionDto,
  ) {
    await this.carMechanicalInspRepo.update(
      id,
      updateCarMechanicalInspectionDto,
    );

    return `car inspection with id ${id} updated`;
  }

  remove(id: string) {
    return `This action removes a #${id} carMechanicalInspection`;
  }
}
