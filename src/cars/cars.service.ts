import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);

    const slug = this.generateSlug({
      brandName: createCarDto.brandNameHint,
      modelName: createCarDto.brandNameHint,
      plate: createCarDto.plate,
      year: createCarDto.year,
    });
    try {
      await this.carRepository.save({
        ...car,
        slug,
      });

      return car;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const cars = await this.carRepository.find({
      relations: {
        brand: true,
        model: true,
        transmissionType: true,
        inventoryState: true,
      },
      select: {
        id: true,
        plate: true,
        slug: true,
        displacement: true,
        model: {
          brandId: false,
        },
      },
    });

    return cars;
  }

  async findOne(id: string) {
    try {
      const car = await this.carRepository.findOne({ where: { id } });
      if (!car) {
        throw new NotFoundException(`Car with id '${id}' not found.`);
      }
      return car;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const slug = this.generateSlug({
      brandName: updateCarDto.brandNameHint!,
      modelName: updateCarDto.brandNameHint!,
      plate: updateCarDto.plate!,
      year: updateCarDto.year!,
    });
    try {
      const result = await this.carRepository.update(id, {
        ...updateCarDto,
        slug,
      });

      if (result.affected === 0) {
        throw new NotFoundException(`Model with id '${id} doesn't exists'`);
      }
      return `Car with id #${id} has been updated`;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const result = await this.carRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return { message: 'Car romove' };
  }

  // * Encontrar todos los items eliminados
  // TODO: endpoint no implementado
  async findAllIncludingDeleted() {
    return this.carRepository.find({
      withDeleted: true,
    });
  }

  // * Restaurar un item eliminado
  // TODO: endpoint no implementado
  async restore(id: string) {
    const result = await this.carRepository.restore(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Car with id ${id} was not found or not was removed`,
      );
    }

    return { message: 'Car restore' };
  }

  private generateSlug(props: {
    brandName: string;
    modelName: string;
    year: number;
    plate: string;
  }): string {
    const { brandName, modelName, plate, year } = props;

    return `${brandName}_${modelName}_${year}_${plate}`
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
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
