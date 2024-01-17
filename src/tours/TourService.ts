import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from 'src/graphql/models/Tour';
import { CreateTourInput } from './CreateTourInput';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tourRepository: Repository<Tour>,
  ) {}

  getTours() {
    return this.tourRepository.find();
  }

  getTourById(id: string) {
    return this.tourRepository.findOneBy({ id });
  }

  async getTourTravel(id: string) {
    return (await this.tourRepository.findOneBy({ id })).travel;
  }

  createTour(tour: CreateTourInput) {
    const newTour = this.tourRepository.create(tour);
    return this.tourRepository.save(newTour);
  }
}
