import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Travel } from '../models/Travel';
import { mockTravels } from 'src/__mocks__/mockTravels';

@Resolver()
export class TravelResolver {
  @Query((returns) => Travel, {
    nullable: true,
    description: 'Get travel by ID',
  })
  getTravelById(
    @Args('id')
    id: string,
  ): Travel {
    return mockTravels.find((travel) => travel.id === id);
  }

  @Query((returns) => [Travel], {
    description: 'Get all travels',
  })
  getAllTravels(): Travel[] {
    return mockTravels;
  }
}