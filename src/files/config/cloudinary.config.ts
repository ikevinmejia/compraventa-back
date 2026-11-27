import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService
        .getOrThrow<string>('CLOUDINARY_CLOUD_NAME')
        .trim(),
      api_key: configService.getOrThrow<string>('CLOUDINARY_API_KEY').trim(),
      api_secret: configService
        .getOrThrow<string>('CLOUDINARY_API_SECRET')
        .trim(),
    });

    return cloudinary;
  },
  inject: [ConfigService],
};
