import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEngineTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
