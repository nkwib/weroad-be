import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Travel } from '../graphql/models/Travel';

@ObjectType()
export class PaginatedTravelsResult {
  @Field(() => [Travel])
  travels: Travel[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
