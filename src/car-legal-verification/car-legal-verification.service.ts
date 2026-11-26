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
      car: { id: carId },
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
    carId: string,
    updateCarLegalVerificationDto: UpdateCarLegalVerificationDto,
  ) {
    const existing = await this.carLegalRepo.findOne({
      where: { car: { id: carId } },
    });

    if (!existing) {
      const created = this.carLegalRepo.create({
        ...updateCarLegalVerificationDto,
        car: { id: carId },
      });

      return await this.carLegalRepo.save(created);
    }

    const cleanDto = { ...updateCarLegalVerificationDto } as Record<
      string,
      unknown
    >;

    delete cleanDto.id;
    delete cleanDto.carId;
    delete cleanDto.car;

    this.carLegalRepo.merge(existing, cleanDto);
    return await this.carLegalRepo.save(existing);
  }

  remove(id: string) {
    return { message: `This action removes a #${id} carLegalVerification` };
  }
}
