import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { Tour } from '../graphql/models/Tour';
import { Travel } from '../graphql/models/Travel';
import { CreateTourInput } from './CreateTourInput';
import { TourService } from './TourService';
import { Roles } from 'src/auth/roles.factory';

@Resolver(() => Tour)
export class TourResolver {
  constructor(private readonly tourService: TourService) {}

  @Query(() => Tour, {
    nullable: true,
    description: 'Get tour by ID',
  })
  getTourById(@Args('id') id: string) {
    return this.tourService.getTourById(id);
  }

  @Query(() => [Tour], { description: 'Get all tours' })
  getAllTours() {
    return this.tourService.getTours();
  }

  @ResolveField(() => Travel, { name: 'travel' })
  getTravelTour(@Parent() tour: Tour) {
    return this.tourService.getTourTravel(tour.id);
  }

  @Mutation(() => Tour)
  @Roles('admin')
  createTour(@Args('createTourData') createTourData: CreateTourInput) {
    return this.tourService.createTour(createTourData);
  }
}
