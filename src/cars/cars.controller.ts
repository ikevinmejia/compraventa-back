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
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { FindCarsQueryDto } from '../common/dtos/filters.dto';
import { imageFileFilter } from '../files/helpers/file-filter.helper';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ReorderCarImagesDto,
  UploadCarImagesDto,
} from './dto/upload-car-images.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() query: FindCarsQueryDto) {
    return this.carsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.superUser)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.remove(id);
  }

  // * Añadir imagenes

  @Patch(':carId/images')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
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
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async setCover(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ) {
    return this.carsService.setCoverImage(carId, imageId);
  }

  @Patch(':carId/images/order')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async reorderImages(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() updateCarImagesDto: ReorderCarImagesDto,
  ) {
    return this.carsService.reorderImages(carId, updateCarImagesDto);
  }

  // * Eliminar imagen

  @Delete(':carId/images')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  async deleteImages(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Query('imgPublicId') imgPublicId: string,
  ) {
    return this.carsService.deleteImage(carId, imgPublicId);
  }
}
