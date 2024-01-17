import { Field, InputType, Int } from '@nestjs/graphql';
import { Mood } from '../graphql/models/Mood';

@InputType()
export class CreateTravelInput {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  numberOfDays: number;

  @Field(() => Mood)
  moods: Mood;
}
