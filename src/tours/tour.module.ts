import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '../graphql/models/Tour';
import { TourService } from './TourService';
import { TourResolver } from './TourResolver';
import { RolesModule } from '../users/roles.module';
import { Travel } from '../graphql/models/Travel';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([Tour, Travel])],
  controllers: [],
  providers: [TourService, TourResolver],
})
export class ToursModule {}
