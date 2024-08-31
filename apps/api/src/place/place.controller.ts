import { ticketSchema } from '@repo/schemas';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Put,
  UsePipes,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { ZodValidationPipe } from '../utils/validation.pipes';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('getTicket')
  async getTicket() {
    const place = await this.placeService.GetTicket();

    if (!place) throw new ConflictException('No available place');

    return { ticketId: place.ticket, placeId: place.id };
  }

  @Put('removeTicket')
  @UsePipes(new ZodValidationPipe(ticketSchema))
  async removeTicket(@Body() body: { ticketId: string; placeId: number }) {
    const place = await this.placeService.RemoveTicket(body);

    if (!place) throw new BadRequestException('Ticket or Place not found');

    return { message: 'Ticket removed' };
  }
}
