import { PartialType } from '@nestjs/swagger';
import { CreateCarLegalVerificationDto } from './create-car-legal-verification.dto';

export class UpdateCarLegalVerificationDto extends PartialType(CreateCarLegalVerificationDto) {}
