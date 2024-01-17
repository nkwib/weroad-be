import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travel } from 'src/graphql/models/Travel';
import { CreateTravelInput } from './CreateTravelInput';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepository: Repository<Travel>,
  ) {}

  async getTravels() {
    return this.travelRepository.find();
  }

  getTravelById(id: string) {
    return this.travelRepository.findOneBy({ id });
  }

  createTravel(travel: CreateTravelInput) {
    const newTravel = this.travelRepository.create(travel);
    return this.travelRepository.save(newTravel);
  }
}
