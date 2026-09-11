import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from '../models/entities/model.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger('BrandsService');
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandRepository.create(createBrandDto);
      await this.brandRepository.save(brand);
      return brand;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const brands = await this.brandRepository.find();

      return brands;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.brandRepository.findOneBy({ id });

      return brand;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findModelsByBrand(brandId: number) {
    try {
      const brandExists = await this.brandRepository.existsBy({ id: brandId });

      if (!brandExists) {
        throw new NotFoundException(
          `Brand with id '${brandId}' doesn't exists`,
        );
      }

      const brand = await this.modelRepository.find({
        where: { brandId },
        select: { id: true, name: true },
      });

      return brand;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} ${updateBrandDto.name} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
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
