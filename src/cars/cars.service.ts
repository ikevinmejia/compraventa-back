import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { FilesService } from '../files/files.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { UploadCarImagesDto } from './dto/upload-car-images.dto';
import { CarImage } from './entities/car-image.entity';
import { Car } from './entities/car.entity';
import { resolveCoverImageUrl } from './helpers/resolve-cover-image.helper';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(CarImage)
    private readonly carImageRepo: Repository<CarImage>,

    private readonly fileService: FilesService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);

    const slug = this.generateSlug({
      brandName: createCarDto.brandNameHint,
      modelName: createCarDto.brandNameHint,
      plate: createCarDto.plate,
      year: createCarDto.year,
    });

    await this.carRepository.save({
      ...car,
      slug,
    });

    return car;
  }

  async findAll(paginationDto: PaginationDto) {
    const { offset = 1, limit = 20 } = paginationDto;

    const [cars, total] = await this.carRepository.findAndCount({
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
      take: limit,
      skip: (offset - 1) * limit,
      order: { createdAt: 'DESC' }, // ver nota abajo
    });

    return {
      data: cars,
      meta: {
        total,
        page: offset,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found.`);
    }
    return {
      ...car,
      coverImageUrl: resolveCoverImageUrl(car),
    };
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const slug = this.generateSlug({
      brandName: updateCarDto.brandNameHint!,
      modelName: updateCarDto.brandNameHint!,
      plate: updateCarDto.plate!,
      year: updateCarDto.year!,
    });

    const result = await this.carRepository.update(id, {
      ...updateCarDto,
      slug,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Model with id '${id} doesn't exists'`);
    }
    return `Car with id #${id} has been updated`;
  }

  async remove(id: string) {
    const result = await this.carRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return { message: 'Car romove' };
  }

  // * actualizar imagenes

  async addImages(
    carId: string,
    files: Express.Multer.File[],
    uploadCarImagesDto: UploadCarImagesDto,
  ) {
    const { coverIndex } = uploadCarImagesDto;
    if (!files?.length) {
      throw new BadRequestException('At least one image is required');
    }

    const uploaded = await Promise.all(
      files.map((file) => this.fileService.uploadImage(file, 'cars')),
    );

    const hasCover = await this.carImageRepo.exists({
      where: { carId, isCover: true },
    });

    // Si hay portada, no se reemplaza
    // Se reemplaza a menos que desde frontend se indique

    const resolvedCoverIndex = coverIndex ?? (hasCover ? undefined : 0);

    if (resolvedCoverIndex !== undefined && hasCover) {
      // Front envía portada nueva, se actualiza

      await this.carImageRepo.update(
        { carId, isCover: true },
        { isCover: false },
      );
    }

    const newImages = uploaded.map(({ url, publicId }, index) =>
      this.carImageRepo.create({
        carId,
        url,
        publicId,
        isCover: index === resolvedCoverIndex,
        displayOrder: index,
      }),
    );

    await this.carImageRepo.save(newImages);

    return 'Images updated!';
  }

  async setCoverImage(carId: string, imageId: string) {
    // Validando que la imagen pertenezca al auto
    const image = await this.carImageRepo.findOne({
      where: { id: imageId, carId },
    });

    if (!image) {
      throw new NotFoundException(
        `Image ${imageId} not found for a car ${carId}`,
      );
    }

    await this.carImageRepo.update({ carId }, { isCover: false });
    await this.carImageRepo.update({ id: imageId }, { isCover: true });

    return 'Cover image updated';
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
}
