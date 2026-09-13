import { Controller, Get, Param } from '@nestjs/common';
import { CatalogsService, type CatalogName } from './catalogs.service';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Get(':catalogName')
  findAll(@Param('catalogName') catalogName: CatalogName) {
    return this.catalogsService.findAll(catalogName);
  }
}
