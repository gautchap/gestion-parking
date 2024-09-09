import { ticketSchema } from '@repo/schemas';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Inject,
  Put,
  UsePipes,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { ZodValidationPipe } from '../utils/validation.pipes';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('getTicket')
  async getTicket() {
    const place = await this.placeService.GetTicket();

    if (!place) throw new ConflictException('No available place');

    await this.cacheManager.del('parking');

    return { ticketId: place.ticket, placeId: place.id };
  }

  @Put('removeTicket')
  @UsePipes(new ZodValidationPipe(ticketSchema))
  async removeTicket(@Body() body: { ticketId: string; placeId: number }) {
    const place = await this.placeService.RemoveTicket(body);

    if (!place) throw new BadRequestException('Ticket or Place not found');

    await this.cacheManager.del('parking');

    return { message: 'Ticket removed' };
  }
}
