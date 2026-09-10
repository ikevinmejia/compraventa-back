import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransmissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
