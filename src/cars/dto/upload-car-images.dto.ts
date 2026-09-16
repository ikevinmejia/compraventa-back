import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UploadCarImagesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coverIndex?: number;
}
