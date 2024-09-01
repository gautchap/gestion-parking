import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get('list')
  async getParking() {
    const parking = await this.parkingService.GetParking();

    if (!parking) throw new BadRequestException('Parking not found');

    return parking;
  }
}
