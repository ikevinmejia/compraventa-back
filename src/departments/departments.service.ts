import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private readonly repo: Repository<Department>,
  ) {}

  async findAll() {
    return await this.repo.find({});
  }

  async findOne(id: number) {
    const department = await this.repo.findOne({
      where: { id },
      select: { municipalities: false },
    });

    if (!department) {
      throw new NotFoundException(`Department with id #${id} not found`);
    }

    return department;
  }

  async findMunicipalities(id: number) {
    const department = await this.repo.findOne({
      where: { id },
      relations: { municipalities: true },
      select: {
        id: false,
        name: false,
        municipalities: {
          id: true,
          name: true,
        },
      },
    });

    if (!department) {
      throw new NotFoundException(`Department with id #${id} not found`);
    }

    return department.municipalities;
  }
}
