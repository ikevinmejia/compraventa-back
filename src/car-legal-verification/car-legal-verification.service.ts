import { Injectable } from '@nestjs/common';
import { CreateCarLegalVerificationDto } from './dto/create-car-legal-verification.dto';
import { UpdateCarLegalVerificationDto } from './dto/update-car-legal-verification.dto';

@Injectable()
export class CarLegalVerificationService {
  create(createCarLegalVerificationDto: CreateCarLegalVerificationDto) {
    return 'This action adds a new carLegalVerification';
  }

  findAll() {
    return `This action returns all carLegalVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carLegalVerification`;
  }

  update(id: number, updateCarLegalVerificationDto: UpdateCarLegalVerificationDto) {
    return `This action updates a #${id} carLegalVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} carLegalVerification`;
  }
}
