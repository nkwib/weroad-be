import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Travel } from '../graphql/models/Travel';
import { CreateTravelInput } from './CreateTravelInput';
import { TravelService } from './TravelService';
import { Roles } from 'src/auth/roles.factory';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Resolver()
export class TravelResolver {
  constructor(private readonly travelService: TravelService) {}

  @Query(() => Travel, {
    nullable: true,
    description: 'Get travel by ID',
  })
  getTravelById(@Args('id') id: string) {
    return this.travelService.getTravelById(id);
  }

  @Query(() => [Travel], { description: 'Get all travels' })
  @UseGuards(JwtAuthGuard)
  getAllTravels() {
    return this.travelService.getTravels();
  }

  @Mutation(() => Travel)
  @Roles('admin')
  createTravel(@Args('createTravelData') createTravelData: CreateTravelInput) {
    return this.travelService.createTravel(createTravelData);
  }
}
