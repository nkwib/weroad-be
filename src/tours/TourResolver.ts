import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Mutation,
  Float,
  Int,
} from '@nestjs/graphql';
import { Tour } from '../graphql/models/Tour';
import { Travel } from '../graphql/models/Travel';
import { CreateTourInput, UpdateTourInput } from './CreateTourInput';
import { TourService } from './TourService';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { PaginatedToursResult } from './PaginatedToursResult';

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

  @Query(() => PaginatedToursResult, { description: 'Get all tours' })
  getAllTours(
    @Args('page', { type: () => Int, defaultValue: 0 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('priceFrom', { type: () => Int, nullable: true }) priceFrom?: number,
    @Args('priceTo', { type: () => Int, nullable: true }) priceTo?: number,
    @Args('startingDate', { type: () => String, nullable: true })
    startingDate?: string,
    @Args('endingDate', { type: () => String, nullable: true })
    endingDate?: string,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
  ): Promise<PaginatedToursResult> {
    return this.tourService.getPaginatedTours({
      priceFrom,
      priceTo,
      startingDate,
      endingDate,
      sortBy,
      page,
      limit,
    });
  }

  @ResolveField(() => Travel, { name: 'travel' })
  getTravelTour(@Parent() tour: Tour) {
    return this.tourService.getTourTravel(tour.id);
  }

  @ResolveField('price', () => Float)
  getPrice(@Parent() tour: Tour): number {
    return tour.price / 100;
  }

  @Mutation(() => Tour)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createTour(@Args('createTourData') createTourData: CreateTourInput) {
    return this.tourService.createTour(createTourData);
  }

  @Mutation(() => Tour)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'editor')
  updateTour(@Args('updateTourData') updateTourData: UpdateTourInput) {
    return this.tourService.updateTour(updateTourData);
  }

  @Mutation(() => Travel)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteTour(@Args('id') id: string) {
    return this.tourService.deleteTour(id);
  }
}
