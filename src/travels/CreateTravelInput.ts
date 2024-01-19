import { Field, InputType, Int } from '@nestjs/graphql';
import { Mood } from '../graphql/models/Mood';

@InputType()
export class CreateTravelInput {
  @Field({ nullable: true })
  slug?: string;

  @Field()
  name: string;

  @Field({ defaultValue: false })
  isPublic: boolean;

  @Field({ nullable: true })
  img?: string;

  @Field()
  description: string;

  @Field(() => Int)
  numberOfDays: number;

  @Field(() => Mood)
  moods: Mood;
}

@InputType()
export class UpdateTravelInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  isPublic: boolean;

  @Field({ nullable: true })
  img: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  numberOfDays?: number;

  @Field(() => Mood, { nullable: true })
  moods?: Mood;
}
