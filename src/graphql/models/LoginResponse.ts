import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from './User';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
