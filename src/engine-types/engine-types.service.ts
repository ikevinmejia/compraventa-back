import { Injectable } from '@nestjs/common';
import { CreateEngineTypeDto } from './dto/create-engine-type.dto';
import { UpdateEngineTypeDto } from './dto/update-engine-type.dto';

@Injectable()
export class EngineTypesService {
  create(createEngineTypeDto: CreateEngineTypeDto) {
    return 'This action adds a new engineType';
  }

  findAll() {
    return `This action returns all engineTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engineType`;
  }

  update(id: number, updateEngineTypeDto: UpdateEngineTypeDto) {
    return `This action updates a #${id} engineType`;
  }

  remove(id: number) {
    return `This action removes a #${id} engineType`;
  }
}
