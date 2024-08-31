import type { Place } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PlaceService {
  constructor(private readonly prismaService: PrismaService) {}
  private async findPlace(): Promise<Place | null> {
    try {
      return await this.prismaService.place.findFirst({
        where: {
          free: true,
          ticket: null,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  private async generateTicket() {
    return await this.prismaService.ticket.create({
      data: {
        id: randomUUID(),
      },
    });
  }
  async GetTicket() {
    const place = await this.findPlace();
    if (!place) return null;
    const ticket = await this.generateTicket();

    const updatePlace = await this.prismaService.place.update({
      where: {
        id: place.id,
      },
      data: {
        free: false,
        ticket: ticket.id,
      },
    });

    return updatePlace;
  }
}
