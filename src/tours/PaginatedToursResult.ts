import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tour } from '../graphql/models/Tour';

@ObjectType()
export class PaginatedToursResult {
  @Field(() => [Tour])
  tours: Tour[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
