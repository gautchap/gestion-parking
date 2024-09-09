import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('parking')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('list')
  async getParking() {
    const cachedParking = await this.cacheManager.get('parking');

    if (cachedParking) {
      return cachedParking;
    }
    const parking = await this.parkingService.GetParking();

    if (!parking) throw new BadRequestException('Parking not found');

    await this.cacheManager.set('parking', parking, 0);

    return parking;
  }
}
