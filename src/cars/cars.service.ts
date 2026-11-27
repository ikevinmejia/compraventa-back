import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/browser';
import { CarLegalVerification } from '../car-legal-verification/entities/car-legal-verification.entity';
import { FindCarsQueryDto } from '../common/dtos/filters.dto';
import { FilesService } from '../files/files.service';
import { CreateCarDto } from './dto/create-car.dto';
import { CarListItemDto } from './dto/list-item-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ReorderCarImagesDto,
  UploadCarImagesDto,
} from './dto/upload-car-images.dto';
import { CarImage } from './entities/car-image.entity';
import { Car } from './entities/car.entity';
import { resolveCoverImageUrl } from './helpers/resolve-cover-image.helper';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(CarLegalVerification)
    private readonly carLegalRepo: Repository<CarLegalVerification>,
    @InjectRepository(CarImage)
    private readonly carImageRepo: Repository<CarImage>,

    private readonly fileService: FilesService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);

    const slug = this.generateSlug({
      brandName: createCarDto.brandNameHint,
      modelName: createCarDto.modelNameHint,
      plate: createCarDto.plate,
      year: createCarDto.year,
    });

    const newCar = await this.carRepository.save({
      ...car,
      slug,
    });

    return newCar;
  }

  async findAll(query: FindCarsQueryDto) {
    const {
      offset = 1,
      limit = 20,
      search,
      brandId,
      modelId,
      engineTypeId,
      transmissionId,
      entryDate,
    } = query;

    const qb = this.carRepository
      .createQueryBuilder('car')
      .leftJoin('car.brand', 'brand')
      .leftJoin('car.model', 'model')
      .leftJoin('car.engineType', 'engineType')
      .leftJoin('car.transmissionType', 'transmissionType')
      .leftJoin('car.inventoryState', 'inventoryState')
      .leftJoin('car.images', 'images')
      .select([
        'car.id',
        'car.plate',
        'car.slug',
        'car.year',
        'car.displacement',
        'car.createdAt',
        'brand.id',
        'brand.name',
        'model.id',
        'model.name',
        'engineType.id',
        'engineType.name',
        'transmissionType.id',
        'transmissionType.name',
        'inventoryState.id',
        'inventoryState.name',
        'images.id',
        'images.url',
        'images.isCover',
        'images.displayOrder',
      ]);

    this.applyFilters(qb, {
      search,
      brandId,
      modelId,
      engineTypeId,
      transmissionId,
      entryDate,
    });

    const [cars, total] = await qb
      .orderBy('car.createdAt', 'DESC')
      .addOrderBy('car.id', 'ASC') // desempate para que la paginación sea estable
      .take(limit)
      .skip((offset - 1) * limit)
      .getManyAndCount();

    return {
      data: cars.map((car) => this.toListItem(car)),
      meta: {
        total,
        page: offset,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private applyFilters(
    qb: SelectQueryBuilder<Car>,
    {
      search,
      brandId,
      modelId,
      engineTypeId,
      transmissionId,
      entryDate,
    }: Omit<FindCarsQueryDto, 'limit' | 'offset'>,
  ) {
    if (search) {
      // Escapa % y _ para que el usuario no los use como comodines
      const term = `%${search.replace(/[\\%_]/g, '\\$&')}%`;
      qb.andWhere(
        new Brackets((w) => {
          w.where('car.plate ILIKE :term')
            .orWhere('brand.name ILIKE :term')
            .orWhere('model.name ILIKE :term');
        }),
        { term },
      );
    }

    if (brandId) qb.andWhere('car.brandId = :brandId', { brandId });
    if (modelId) qb.andWhere('car.modelId = :modelId', { modelId });
    if (engineTypeId) {
      qb.andWhere('car.engineTypeId = :engineTypeId', { engineTypeId });
    }

    if (transmissionId) {
      qb.andWhere('car.transmissionId = :transmissionId', { transmissionId });
    }

    if (entryDate) {
      // Rango del día completo en hora de Colombia (UTC-5, sin horario de verano)
      const start = new Date(`${entryDate}T00:00:00-05:00`);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      qb.andWhere('car.createdAt >= :start AND car.createdAt < :end', {
        start,
        end,
      });
    }
  }

  private toListItem(car: Car): CarListItemDto {
    return {
      id: car.id,
      plate: car.plate,
      slug: car.slug || '',
      displacement: car.displacement || 0,
      engineType: car.engineType.name,
      year: car.year,
      brand: car.brand.name,
      model: car.model.name,
      transmission: car.transmissionType.name,
      inventoryState: car.inventoryState.name,
      coverImageUrl: resolveCoverImageUrl(car),
    };
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: {
        brand: true, // ← falta esto
        model: true,
        engineType: true,
        transmissionType: true,
        inventoryState: true,
        cosmeticInspection: {
          rimsType: true,
          tiresCondition: true,
          steeringColumnAdjustment: true,
          paintCondition: true,
          chassisFrontDamage: true,
          driverDoorPillar: true,
          passengerDoorPillar: true,
          trunkFloor: true,
          trunkStructure: true,
          mirrorsType: true,
        },
        legalVerification: {
          insuranceClaimType: true,
          registrationCity: true,
          registrationDepartment: true,
        },
        mechanicalInspection: {
          transmissionCondition: true,
          suspensionCondition: true,
        },
        images: true,
      },
      select: {
        id: true,
        plate: true,
        price: true,
        year: true,
        displacement: true,
        slug: true,
        brand: { id: true, name: true },
        model: { id: true, name: true },
        engineType: { id: true, name: true },
        transmissionType: { id: true, name: true },
        inventoryState: { id: true, name: true },
        mechanicalInspection: {
          id: false,
          hasEngineLeaks: true,
          engineLeaksDetail: true,
          additionalMechanicalObservations: true,
          transmissionCondition: { id: true, name: true },
          suspensionCondition: { id: true, name: true },
        },
        cosmeticInspection: {
          id: false,
          electricWindowsFunctional: true,
          windowsCheckByDoor: true,
          mirrorsFunctional: true,
          hoodDents: true,
          doorsOpenProperly: true,
          trunkHasRust: true,
          hasSpareTire: true,
          additionalObservations: true,
          rimsType: { id: true, name: true },
          tiresCondition: { id: true, name: true },
          steeringColumnAdjustment: { id: true, name: true },
          mirrorsType: { id: true, name: true },
          paintCondition: { id: true, name: true },
          chassisFrontDamage: { id: true, name: true },
          driverDoorPillar: { id: true, name: true },
          passengerDoorPillar: { id: true, name: true },
          trunkStructure: { id: true, name: true },
          trunkFloor: { id: true, name: true },
        },
        legalVerification: {
          id: true,
          hadPublicServiceUse: true,
          hasInsuranceClaims: true,
          hasTrafficFines: true,
          insuranceClaimType: { id: true, name: true },
          municipalTrafficLightTaxUpToDate: true,
          registrationCity: { id: true, name: true },
          registrationDepartment: { id: true, name: true },
          runtHasLiens: true,
          runtMatchesLicense: true,
          soatExpirationDate: true,
          taxesOwedYears: true,
          taxesUpToDate: true,
          technicalInspectionExpirationDate: true,
          trafficFinesCount: true,
          trafficFinesTotalAmount: true,
        },
      },
    });
    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found.`);
    }

    if (car.legalVerification) {
      const legal = await this.carLegalRepo.findOne({
        where: { id: car.legalVerification.id },
        relations: { runtPendingIssues: true },
        select: {
          id: true,
          runtPendingIssues: { id: true, name: true },
        },
      });
      car.legalVerification.runtPendingIssues = legal?.runtPendingIssues ?? [];
    }
    return {
      ...car,
      coverImageUrl: resolveCoverImageUrl(car),
    };
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const { brandNameHint, modelNameHint, ...rest } = updateCarDto;
    const slug = this.generateSlug({
      brandName: brandNameHint!,
      modelName: modelNameHint!,
      plate: rest.plate!,
      year: rest.year!,
    });

    const result = await this.carRepository.update(id, {
      ...rest,
      slug,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Model with id '${id} doesn't exists'`);
    }
    return { message: `Car with id #${id} has been updated` };
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

    return { message: 'Images updated!' };
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

    return { message: 'Cover image updated' };
  }

  async reorderImages(carId: string, dto: ReorderCarImagesDto) {
    try {
      for (const [displayOrder, id] of dto.imageIds.entries()) {
        await this.carImageRepo.update({ id, carId }, { displayOrder });
      }

      return { message: 'Image order updated' };
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  async deleteImage(
    carId: string,
    imgPublicId: string,
  ): Promise<{ message: string }> {
    // 1. Verificar primero si la imagen pertenece a ese carro en la BD
    const image = await this.carImageRepo.findOne({
      where: { publicId: imgPublicId, carId },
    });

    if (!image) {
      throw new NotFoundException(
        'Image not found or does not belong to this car',
      );
    }

    try {
      // 2. Eliminar de Cloudinary (si falla, lanza BadRequestException y no borra de la BD)
      await this.fileService.deleteImage(imgPublicId);

      // 3. Eliminar el registro de la base de datos
      await this.carImageRepo.remove(image);

      return { message: 'Image deleted successfully' };
    } catch (error) {
      // Si ya es una excepción HTTP de NestJS (como BadRequestException), la relanzamos tal cual
      if (error instanceof HttpException) {
        throw error;
      }

      // Para errores inesperados de base de datos o red
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unexpected error deleting image';
      throw new InternalServerErrorException(errorMessage);
    }
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
      .replace(/[^a-z0-9 -]/g, '');
    // .replace(/\s+/g, '-')
    // .replace(/-+/g, '-');
  }
}
