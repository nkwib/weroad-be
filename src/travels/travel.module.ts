import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from '../graphql/models/Travel';
import { TravelService } from './TravelService';
import { TravelResolver } from './TravelResolver';
import { Tour } from '../graphql/models/Tour';
import { RolesModule } from '../users/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Travel, Tour]), RolesModule],
  controllers: [],
  providers: [TravelService, TravelResolver],
})
export class TravelsModule {}
