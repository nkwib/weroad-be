import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../graphql/models/Tour';
import { CreateTourInput, UpdateTourInput } from './CreateTourInput';
import { Travel } from '../graphql/models/Travel';
import { PaginatedToursResult } from './PaginatedToursResult';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  getTours(pagination: { page: number; limit: number }): Promise<Tour[]> {
    return this.tourRepository.find({
      skip: pagination.page * pagination.limit,
      take: pagination.limit,
    });
  }

  async getPaginatedTours(pagination: {
    priceFrom;
    priceTo;
    startingDate;
    endingDate;
    sortBy;
    page: number;
    limit: number;
  }): Promise<PaginatedToursResult> {
    const queryBuilder = this.tourRepository.createQueryBuilder('tour');
    if (pagination.priceFrom) {
      queryBuilder.andWhere('tour.price >= :priceFrom', {
        priceFrom: pagination.priceFrom,
      });
    }
    if (pagination.priceTo) {
      queryBuilder.andWhere('tour.price <= :priceTo', {
        priceTo: pagination.priceTo,
      });
    }
    if (pagination.startingDate) {
      queryBuilder.andWhere('tour.startingDate >= :startingDate', {
        startingDate: pagination.startingDate,
      });
    }
    if (pagination.endingDate) {
      queryBuilder.andWhere('tour.endingDate <= :endingDate', {
        endingDate: pagination.endingDate,
      });
    }
    if (pagination.sortBy) {
      const [column, order] = pagination.sortBy.split('_');
      queryBuilder.orderBy(`tour.${column}`, order);
    }
    const [tours, total] = await queryBuilder
      .skip(pagination.page * pagination.limit)
      .take(pagination.limit)
      .getManyAndCount();
    return {
      tours,
      total,
      page: pagination.page,
      limit: pagination.limit,
    };
  }

  getTourById(id: string) {
    return this.tourRepository.findOneBy({ id });
  }

  async getTourTravel(id: string) {
    return (await this.tourRepository.findOneBy({ id })).travel;
  }

  async createTour(tour: CreateTourInput) {
    const travel = await this.travelRepository.findOneBy({ id: tour.travelId });
    if (!travel) {
      throw new Error('Travel not found');
    }
    const newTour = this.tourRepository.create(tour);
    return this.tourRepository.save(newTour);
  }

  async updateTour(tour: UpdateTourInput) {
    const tourToUpdate = await this.tourRepository.findOneBy({ id: tour.id });
    if (!tourToUpdate) {
      throw new Error('Tour not found');
    }
    const updatedTour = this.tourRepository.merge(tourToUpdate, tour);
    return this.tourRepository.save(updatedTour);
  }

  async deleteTour(id: string) {
    const tourToDelete = await this.tourRepository.findOneBy({ id });
    if (!tourToDelete) {
      throw new Error('Tour not found');
    }
    return this.tourRepository.delete(tourToDelete);
  }
}
