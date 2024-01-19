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

@InputType()
export class UpdateTourInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  startingDate?: string;

  @Field({ nullable: true })
  endingDate?: string;

  @Field(() => Int, { nullable: true })
  price?: number;
}
