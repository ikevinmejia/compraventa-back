import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelsService {
  private readonly logger = new Logger('CarsService');
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);
    try {
      await this.modelRepository.save(model);

      return model;
    } catch (error) {
      this.handleDBExceptions(error);
    }

    return 'This action adds a new model';
  }

  async findAll() {
    try {
      const models = await this.modelRepository.find();

      return models;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const model = await this.modelRepository.findOneBy({ id });

      return model;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
