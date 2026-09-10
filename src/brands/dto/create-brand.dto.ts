import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  name: string;

  @IsInt()
  @IsNotEmpty()
  modelId: number;
}
