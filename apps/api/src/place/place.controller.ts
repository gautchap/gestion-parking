import { ConflictException, Controller, Get } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('getTicket')
  async getTicket() {
    const place = await this.placeService.GetTicket();

    if (!place) throw new ConflictException('No available place');

    return { ticketId: place.ticket, placeId: place.id };
  }
}
