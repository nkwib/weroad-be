import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/graphql/models/Tour';
import { TourService } from './TourService';
import { TourResolver } from './TourResolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [],
  providers: [TourService, TourResolver],
})
export class ToursModule {}
