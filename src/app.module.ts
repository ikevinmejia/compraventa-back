import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CarCosmeticInspectionModule } from './car-cosmetic-inspection/car-cosmetic-inspection.module';
import { CarLegalVerificationModule } from './car-legal-verification/car-legal-verification.module';
import { CarMechanicalInspectionsModule } from './car-mechanical-inspections/car-mechanical-inspections.module';
import { CarsModule } from './cars/cars.module';
import { CommonModule } from './common/common.module';
import { DepartmentsModule } from './departments/departments.module';
import { FilesModule } from './files/files.module';
import { ModelsModule } from './models/models.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CarsModule,

    // configuración postgress
    // yarn add @nestjs/typeorm typeorm pg
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,

      // Cargar automanticamente las entidades
      autoLoadEntities: true,
      // Sincronización no se usa en producción
      synchronize: true,
    }),

    AuthModule,

    FilesModule,

    BrandsModule,
    ModelsModule,
    SeedModule,
    CarCosmeticInspectionModule,
    CarMechanicalInspectionsModule,
    CarLegalVerificationModule,
    CommonModule,
    DepartmentsModule,
    MunicipalitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
