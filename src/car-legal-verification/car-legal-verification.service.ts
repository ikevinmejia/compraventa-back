import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarLegalVerificationDto } from './dto/create-car-legal-verification.dto';
import { UpdateCarLegalVerificationDto } from './dto/update-car-legal-verification.dto';
import { CarLegalVerification } from './entities/car-legal-verification.entity';

@Injectable()
export class CarLegalVerificationService {
  constructor(
    @InjectRepository(CarLegalVerification)
    private readonly carLegalRepo: Repository<CarLegalVerification>,
  ) {}

  async create(
    carId: string,
    createCarLegalVerificationDto: CreateCarLegalVerificationDto,
  ) {
    const infoLegal = this.carLegalRepo.create({
      ...createCarLegalVerificationDto,
      carId,
    });

    await this.carLegalRepo.save(infoLegal);

    return infoLegal;
  }

  async findAll() {
    const data = await this.carLegalRepo.find({});

    return data;
  }

  async findOne(id: string) {
    const data = await this.carLegalRepo.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(
        `Car legal information with id ${id} not found`,
      );
    }

    return data;
  }

  async update(
    id: string,
    updateCarLegalVerificationDto: UpdateCarLegalVerificationDto,
  ) {
    const result = await this.carLegalRepo.update(
      id,
      updateCarLegalVerificationDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Car legal information with id ${id} not found`,
      );
    }

    return `Car legal information with id ${id} updated`;
  }

  remove(id: string) {
    return `This action removes a #${id} carLegalVerification`;
  }
}
