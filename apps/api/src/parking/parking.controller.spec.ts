import { Test, TestingModule } from '@nestjs/testing';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { BadRequestException } from '@nestjs/common';

describe('ParkingController', () => {
  let controller: ParkingController;
  let service: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [ParkingService, PrismaService],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
    service = module.get<ParkingService>(ParkingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getParking', () => {
    it('should return parking data', async () => {
      const parking = {
        id: randomUUID().toString(),
        places: [
          {
            id: 1,
            free: true,
            ticket: null,
          },
          {
            id: 2,
            free: false,
            ticket: randomUUID().toString(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'GetParking').mockResolvedValue(parking);

      const result = await controller.getParking();

      expect(result).toEqual(parking);
    });

    it('should throw a BadRequestException if parking not found', async () => {
      jest.spyOn(service, 'GetParking').mockResolvedValue(null);

      await expect(controller.getParking()).rejects.toThrow(
        new BadRequestException('Parking not found'),
      );
    });
  });
});
