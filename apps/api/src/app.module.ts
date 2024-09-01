import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlaceController } from './place/place.controller';
import { PlaceService } from './place/place.service';
import { ParkingService } from './parking/parking.service';
import { ParkingController } from './parking/parking.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [AppController, PlaceController, ParkingController],
  providers: [AppService, PrismaService, PlaceService, ParkingService],
})
export class AppModule {}
