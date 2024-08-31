import { Test, TestingModule } from '@nestjs/testing';
import { PlaceService } from './place.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';

describe('PlaceService', () => {
  let service: PlaceService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceService, PrismaService],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GetTicket', () => {
    it('should return null if no available place is found', async () => {
      jest.spyOn(prismaService.place, 'findFirst').mockResolvedValueOnce(null);

      const result = await service.GetTicket();

      expect(result).toBeNull();
    });

    it('should generate a ticket and update the place', async () => {
      const parking = {
        id: randomUUID().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const place = {
        id: 1,
        free: true,
        ticket: null,
        parkingId: parking.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const ticket = {
        id: randomUUID().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedPlace = {
        ...place,
        free: false,
        ticket: ticket.id,
      };

      jest.spyOn(prismaService.place, 'findFirst').mockResolvedValueOnce(place);
      jest.spyOn(prismaService.ticket, 'create').mockResolvedValueOnce(ticket);
      jest
        .spyOn(prismaService.place, 'update')
        .mockResolvedValueOnce(updatedPlace);

      const result = await service.GetTicket();

      expect(result).toEqual(updatedPlace);
    });
  });
});
