import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParkingService {
  constructor(private readonly prismaService: PrismaService) {}
  async GetParking() {
    try {
      return await this.prismaService.parking.findFirst({
        include: {
          places: {
            select: {
              ticket: true,
              id: true,
              free: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
