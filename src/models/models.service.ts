import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);

    await this.modelRepository.save(model);

    return model;
  }

  async findAll() {
    const models = await this.modelRepository.find();

    return models;
  }

  async findOne(id: number) {
    const model = await this.modelRepository.findOneBy({ id });

    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const result = await this.modelRepository.update(id, updateModelDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Model with id '${id} doesn't exists'`);
    }

    return `Model with id # ${id} - ${updateModelDto.name} has been updated`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
