import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ticketSchema } from '@repo/schemas';

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

      const result = controller.getTicket();

      await expect(result).rejects.toThrow(
        new ConflictException('No available place'),
      );
    });
  });
  describe('removeTicket', () => {
    it('should remove the ticket and return a success message', async () => {
      const ticketId = randomUUID().toString();
      const placeId = 1;
      const place = {
        id: placeId,
        free: true,
        ticket: null,
        parkingId: randomUUID().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const removeTicketDto = { ticketId, placeId };

      const expectedResult = { message: 'Ticket removed' };

      jest.spyOn(service, 'RemoveTicket').mockResolvedValue(place);

      const result = await controller.removeTicket(removeTicketDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw a BadRequestException if ticket or place not found', async () => {
      const ticketId = randomUUID().toString();
      const placeId = 1;
      const removeTicketDto = { ticketId, placeId };

      jest.spyOn(service, 'RemoveTicket').mockResolvedValue(null);

      await expect(controller.removeTicket(removeTicketDto)).rejects.toThrow(
        new BadRequestException('Ticket or Place not found'),
      );
    });

    it('should throw a BadRequestException if ticket or place not matching dto', async () => {
      const ticketId = 9999;
      const placeId = randomUUID().toString();
      const removeTicketDto = { ticketId, placeId } as any;

      const removeTicketParsed = ticketSchema.safeParse(removeTicketDto);

      expect(removeTicketParsed.success).toBe(false);

      await expect(controller.removeTicket(removeTicketDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
