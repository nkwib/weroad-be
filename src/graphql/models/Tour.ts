import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tour {
  @Field()
  id: string;

  @Field()
  travelId: string;

  @Field()
  name: string;

  @Field()
  startingDate: string;

  @Field()
  endingDate: string;

  @Field((type) => Int)
  price: number;
}
