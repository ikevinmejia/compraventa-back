import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Departamento,
  InsuranceClaimType,
  Municipio,
  RuntPendingIssue,
} from '../common/entities';
import { CarLegalVerificationController } from './car-legal-verification.controller';
import { CarLegalVerificationService } from './car-legal-verification.service';

@Module({
  controllers: [CarLegalVerificationController],
  providers: [CarLegalVerificationService],
  imports: [
    TypeOrmModule.forFeature([
      CarLegalVerificationModule,
      RuntPendingIssue,
      InsuranceClaimType,
      Departamento,
      Municipio,
    ]),
  ],
})
export class CarLegalVerificationModule {}
