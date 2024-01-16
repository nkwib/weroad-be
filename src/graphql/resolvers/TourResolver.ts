import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Tour } from '../models/Tour';
import { mockTours } from 'src/__mocks__/mockTours';
import { Travel } from '../models/Travel';
import { mockTravels } from 'src/__mocks__/mockTravels';

@Resolver((of) => Tour)
export class TourResolver {
  @Query((returns) => Tour, {
    nullable: true,
    description: 'Get tour by ID',
  })
  getTourById(
    @Args('id')
    id: string,
  ): Tour {
    return mockTours.find((tour) => tour.id === id);
  }

  @Query((returns) => [Tour], {
    description: 'Get all tours',
  })
  getAllTours(): Tour[] {
    return mockTours;
  }

  @ResolveField((returns) => Travel, {
    name: 'travel',
  })
  getTravelTour(@Parent() tour: Tour): Travel {
    return mockTravels.find((travel) => travel.id === tour.travelId);
  }
}
