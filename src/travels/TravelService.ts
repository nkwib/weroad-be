import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travel } from '../graphql/models/Travel';
import { CreateTravelInput, UpdateTravelInput } from './CreateTravelInput';
import { Tour } from '../graphql/models/Tour';
import { PaginatedTravelsResult } from './PaginatedTravelsResult';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
  ) {}

  async getTravels(pagination: {
    skip: number;
    take: number;
    isAdmin: boolean;
  }): Promise<Travel[]> {
    const queryOptions = {
      skip: pagination.skip,
      take: pagination.take,
      where: {},
    };

    if (!pagination.isAdmin) {
      queryOptions.where['isPublic'] = true;
    }

    return this.travelRepository.find(queryOptions);
  }

  async getPaginatedTravels(pagination: {
    page: number;
    limit: number;
    isAdmin: boolean;
  }): Promise<PaginatedTravelsResult> {
    const queryOptions = {
      skip: pagination.page * pagination.limit,
      take: pagination.limit,
      where: {},
    };

    if (!pagination.isAdmin) {
      queryOptions.where['isPublic'] = true;
    }

    const [travels, total] =
      await this.travelRepository.findAndCount(queryOptions);

    return {
      travels,
      total,
      page: pagination.page,
      limit: pagination.limit,
    };
  }

  getTravelById(id: string) {
    return this.travelRepository.findOneBy({ id });
  }

  getAllToursForThisTravel(travelId: string) {
    return this.tourRepository
      .createQueryBuilder('tour')
      .where('tour.travelId = :travelId', { travelId: travelId })
      .getMany();
  }

  createTravel(travel: CreateTravelInput) {
    const newTravel = this.travelRepository.create(travel);
    return this.travelRepository.save(newTravel);
  }

  async updateTravel(travel: UpdateTravelInput) {
    const travelToUpdate = await this.travelRepository.findOneBy({
      id: travel.id,
    });
    if (!travelToUpdate) {
      throw new Error('Travel not found');
    }
    const updatedTravel = this.travelRepository.merge(travelToUpdate, travel);
    return this.travelRepository.save(updatedTravel);
  }

  deleteTravel(id: string) {
    this.tourRepository.delete({ travelId: id });
    return this.travelRepository.delete(id);
  }
}
