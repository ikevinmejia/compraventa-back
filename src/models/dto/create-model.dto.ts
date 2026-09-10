import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  name: string;

  @IsInt()
  @IsNotEmpty()
  brandId: number;
}
