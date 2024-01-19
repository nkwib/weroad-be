import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Int,
  Context,
} from '@nestjs/graphql';
import { Travel } from '../graphql/models/Travel';
import { CreateTravelInput, UpdateTravelInput } from './CreateTravelInput';
import { TravelService } from './TravelService';
import { Tour } from '../graphql/models/Tour';
import { RoleService } from '../users/RoleService';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { PaginatedTravelsResult } from './PaginatedTravelsResult';

function genSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

@Resolver(() => Travel)
export class TravelResolver {
  constructor(
    private readonly travelService: TravelService,
    private readonly roleService: RoleService,
  ) {}

  @Query(() => Travel, {
    nullable: true,
    description: 'Get travel by ID',
  })
  getTravelById(@Args('id') id: string) {
    return this.travelService.getTravelById(id);
  }

  @Query(() => PaginatedTravelsResult, { description: 'Get all travels' })
  @UseGuards(JwtAuthGuard)
  async getAllTravels(
    @Context() context,
    @Args('page', { type: () => Int, defaultValue: 0 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<PaginatedTravelsResult> {
    const user = context.req.user;
    if (!user) {
      return this.travelService.getPaginatedTravels({
        page,
        limit,
        isAdmin: false,
      });
    }
    const userRole = await this.roleService.getRoleById(user?.roleId);
    const isAdmin = userRole?.name === 'admin';
    return this.travelService.getPaginatedTravels({ page, limit, isAdmin });
  }

  @ResolveField('tours', () => [Tour], { name: 'tours' })
  async getTours(@Parent() travel: Travel) {
    return this.travelService.getAllToursForThisTravel(travel.id);
  }

  @Mutation(() => Travel)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createTravel(@Args('createTravelData') createTravelData: CreateTravelInput) {
    if (!createTravelData.slug) {
      createTravelData.slug = genSlug(createTravelData.name);
    }
    return this.travelService.createTravel(createTravelData);
  }

  @Mutation(() => Travel)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateTravel(@Args('updateTravelData') updateTravelData: UpdateTravelInput) {
    return this.travelService.updateTravel(updateTravelData);
  }

  @Mutation(() => Travel)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteTravel(@Args('id') id: string) {
    return this.travelService.deleteTravel(id);
  }
}
