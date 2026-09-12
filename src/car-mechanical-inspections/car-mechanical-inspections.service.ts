import { Injectable } from '@nestjs/common';
import { CreateCarMechanicalInspectionDto } from './dto/create-car-mechanical-inspection.dto';
import { UpdateCarMechanicalInspectionDto } from './dto/update-car-mechanical-inspection.dto';

@Injectable()
export class CarMechanicalInspectionsService {
  create(createCarMechanicalInspectionDto: CreateCarMechanicalInspectionDto) {
    return 'This action adds a new carMechanicalInspection';
  }

  findAll() {
    return `This action returns all carMechanicalInspections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carMechanicalInspection`;
  }

  update(
    id: number,
    updateCarMechanicalInspectionDto: UpdateCarMechanicalInspectionDto,
  ) {
    return `This action updates a #${id} carMechanicalInspection`;
  }

  remove(id: number) {
    return `This action removes a #${id} carMechanicalInspection`;
  }
}
