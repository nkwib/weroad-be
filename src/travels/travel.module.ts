import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from 'src/graphql/models/Travel';
import { TravelService } from './TravelService';
import { TravelResolver } from './TravelResolver';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  controllers: [],
  providers: [TravelService, TravelResolver],
})
export class TravelsModule {}
