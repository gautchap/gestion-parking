import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlaceController } from './place/place.controller';
import { PlaceService } from './place/place.service';
import { ParkingService } from './parking/parking.service';
import { ParkingController } from './parking/parking.controller';
import { join } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web', 'dist'),
      exclude: ['/api*'],
    }),
    PrismaModule,
  ],
  controllers: [PlaceController, ParkingController],
  providers: [PrismaService, PlaceService, ParkingService],
})
export class AppModule {}
