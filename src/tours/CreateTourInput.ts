import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTourInput {
  @Field()
  travelId: string;

  @Field()
  name: string;

  @Field()
  startingDate: string;

  @Field()
  endingDate: string;

  @Field(() => Int)
  price: number;
}
