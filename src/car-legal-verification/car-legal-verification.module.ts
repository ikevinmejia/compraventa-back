import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceClaimType, RuntPendingIssues } from '../common/entities';
import { CarLegalVerificationController } from './car-legal-verification.controller';
import { CarLegalVerificationService } from './car-legal-verification.service';

@Module({
  controllers: [CarLegalVerificationController],
  providers: [CarLegalVerificationService],
  imports: [
    TypeOrmModule.forFeature([
      CarLegalVerificationModule,
      RuntPendingIssues,
      InsuranceClaimType,
    ]),
  ],
})
export class CarLegalVerificationModule {}
