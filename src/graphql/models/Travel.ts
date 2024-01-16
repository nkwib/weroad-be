import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mood } from './Mood';

@ObjectType()
export class Travel {
  @Field()
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => Int)
  numberOfDays: number;

  @Field((type) => Mood)
  moods: Mood;
}
