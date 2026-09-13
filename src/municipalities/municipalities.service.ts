import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipality } from './entities/municipality.entity';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private readonly repo: Repository<Municipality>,
  ) {}

  async findAll() {
    return await this.repo.find({});
  }

  async findOne(id: number) {
    const department = await this.repo.findOneBy({ id });

    if (!department) {
      throw new NotFoundException(`Municipality with id #${id} not found`);
    }

    return department;
  }
}
