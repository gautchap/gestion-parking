import { randomUUID } from 'node:crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from './parking.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ParkingService', () => {
  let service: ParkingService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingService, PrismaService],
    }).compile();

    service = module.get<ParkingService>(ParkingService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('GetParking', () => {
    it('should return null if no parking is found', async () => {
      jest
        .spyOn(prismaService.parking, 'findFirst')
        .mockResolvedValueOnce(null);

      const result = await service.GetParking();

      expect(result).toBeNull();
    });

    it('should return the parking with places', async () => {
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
      } as any;

      jest
        .spyOn(prismaService.parking, 'findFirst')
        .mockResolvedValueOnce(parking);

      const result = await service.GetParking();

      expect(result).toEqual(parking);
    });

    // it('should return null if an error occurs', async () => {
    //   jest
    //     .spyOn(prismaService.parking, 'findFirst')
    //     .mockRejectedValueOnce(new Error('Database error'));

    //   const result = await service.GetParking();

    //   expect(result).toBeNull();
    // });
  });
});
