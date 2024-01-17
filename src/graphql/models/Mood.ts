import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('MoodInput')
export class Mood {
  @Field(() => Int)
  nature: number;

  @Field(() => Int)
  relax: number;

  @Field(() => Int)
  history: number;

  @Field(() => Int)
  culture: number;

  @Field(() => Int)
  party: number;
}
