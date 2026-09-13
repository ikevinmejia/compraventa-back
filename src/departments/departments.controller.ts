import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':departmentId')
  findOne(@Param('departmentId') departmentId: number) {
    return this.departmentsService.findOne(departmentId);
  }

  @Get(':departmentId/municipalities')
  findMunicipalities(@Param('departmentId') departmentId: number) {
    return this.departmentsService.findMunicipalities(departmentId);
  }
}
