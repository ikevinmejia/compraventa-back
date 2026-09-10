import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateInventoryStateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  name: string;
}
