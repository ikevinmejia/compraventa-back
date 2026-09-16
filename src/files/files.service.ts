import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryConfig: typeof cloudinary,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string, // 'cars', 'motorcycles', 'houses', etc.
  ): Promise<{ url: string; publicId: string }> {
    // ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `compraventa/${folder}` },
        (
          error: UploadApiErrorResponse | undefined,
          result?: UploadApiResponse,
        ) => {
          if (error) return reject(new BadRequestException(error.message));
          if (!result) return reject(new BadRequestException('Upload failed'));

          resolve({
            url: result.secure_url,
            publicId: result.public_id, // Se usa para eliminar la imagen en cloudinary
          });
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
