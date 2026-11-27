import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient: typeof cloudinary,
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
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
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
  async deleteImage(publicId: string): Promise<void> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required');
    }

    try {
      const result = (await this.cloudinaryClient.uploader.destroy(publicId, {
        invalidate: true, // Limpia la caché del CDN para que deje de verse de inmediato
      })) as { result: string };

      if (result.result !== 'ok' && result.result !== 'not found') {
        throw new BadRequestException(`Error deleting image: ${result.result}`);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error deleting image from Cloudinary';

      throw new BadRequestException(errorMessage);
    }
  }
}
