import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { Role } from '../models/Role';
import { mockRoles } from 'src/__mocks__/mockRoles';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, {
    nullable: true,
    description: 'Get user by ID',
  })
  getUserById(
    @Args('id')
    id: string,
  ): User {
    return mockUsers.find((user) => user.id === id);
  }

  @Query((returns) => [User], {
    description: 'Get all users',
  })
  getAllUsers(): User[] {
    return mockUsers;
  }

  @ResolveField((returns) => Role, {
    name: 'role',
  })
  getRoleUser(@Parent() user: User): Role {
    return mockRoles.find((role) => role.id === user.roleId);
  }
}
