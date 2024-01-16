import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  roleId: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
