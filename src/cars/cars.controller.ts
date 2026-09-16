import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { imageFileFilter } from '../files/helpers/file-filter.helper';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { UploadCarImagesDto } from './dto/upload-car-images.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.carsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.remove(id);
  }

  // * Añadir imagenes

  @Patch(':carId/images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  async addImages(
    @Param('carId', ParseUUIDPipe) carId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadCarImagesDto: UploadCarImagesDto,
  ) {
    return this.carsService.addImages(carId, files, uploadCarImagesDto);
  }

  @Patch(':carId/images/:imageId/cover')
  async setCover(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ) {
    return this.carsService.setCoverImage(carId, imageId);
  }
}
