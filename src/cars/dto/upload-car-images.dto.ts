import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class UploadCarImagesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  coverIndex?: number;
}

export class ReorderCarImagesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsUUID('all', { each: true })
  imageIds!: string[];
}
