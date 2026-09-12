import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from '../models/entities/model.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(brand);
    return brand;
  }

  async findAll() {
    const brands = await this.brandRepository.find();

    return brands;
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOneBy({ id });

    return brand;
  }

  async findModelsByBrand(brandId: number) {
    const brandExists = await this.brandRepository.existsBy({ id: brandId });

    if (!brandExists) {
      throw new NotFoundException(`Brand with id '${brandId}' doesn't exists`);
    }

    const brand = await this.modelRepository.find({
      where: { brandId },
      select: { id: true, name: true },
    });

    return brand;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} ${updateBrandDto.name} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
