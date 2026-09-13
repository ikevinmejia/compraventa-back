import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceClaimType, RuntPendingIssue } from '../common/entities';
import { Department } from '../departments/entities/department.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { CarLegalVerificationController } from './car-legal-verification.controller';
import { CarLegalVerificationService } from './car-legal-verification.service';
import { CarLegalVerification } from './entities/car-legal-verification.entity';

@Module({
  controllers: [CarLegalVerificationController],
  providers: [CarLegalVerificationService],
  imports: [
    TypeOrmModule.forFeature([
      CarLegalVerification,
      RuntPendingIssue,
      InsuranceClaimType,
      Department,
      Municipality,
    ]),
  ],
})
export class CarLegalVerificationModule {}
