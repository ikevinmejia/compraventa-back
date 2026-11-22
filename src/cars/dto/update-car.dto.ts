import { PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsInt()
  @IsPositive()
  @Max(999999999, { message: 'price no debe ser mayor a 999.999.999' })
  @Min(1, { message: 'price no debe ser menor a 1' })
  price: number;
}
