import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { EngineTypesModule } from './engine-types/engine-types.module';
import { InventoryStatesModule } from './inventory-states/inventory-states.module';
import { TransmissionsModule } from './transmissions/transmissions.module';

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

    BrandsModule,

    ModelsModule,

    EngineTypesModule,

    InventoryStatesModule,

    TransmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
