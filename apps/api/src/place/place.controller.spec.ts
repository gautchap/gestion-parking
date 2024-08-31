import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';

describe('PlaceController', () => {
  let controller: PlaceController;
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [PlaceService, PrismaService],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    service = module.get<PlaceService>(PlaceService);
  });

  describe('getTicket', () => {
    it('should return a ticket and place ID', async () => {
      const place = {
        id: 1,
        free: true,
        ticket: randomUUID().toString(),
        parkingId: randomUUID().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'GetTicket').mockResolvedValue(place);

      const result = await controller.getTicket();

      expect(result).toEqual({ ticketId: place.ticket, placeId: place.id });
    });

    it('should return an error if no available place', async () => {
      jest.spyOn(service, 'GetTicket').mockResolvedValue(null);

      const result = await controller.getTicket();

      expect(result).toEqual({ error: 'No available place' });
    });
  });
});
