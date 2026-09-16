import { DEFAULT_CAR_COVER_IMAGE_URL } from '../../common/constants/images.constants';
import { Car } from '../entities/car.entity';

export function resolveCoverImageUrl(car: Car): string {
  const cover = car.images?.find((image) => image.isCover);
  return cover?.url ?? DEFAULT_CAR_COVER_IMAGE_URL;
}
