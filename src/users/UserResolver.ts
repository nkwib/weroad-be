import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { Role } from '../graphql/models/Role';
import { CreateUserInput } from './CreateUserInput';
import { UserService } from './UserService';
import { RoleService } from './RoleService';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @Query(() => User, {
    nullable: true,
    description: 'Get user by ID',
  })
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User], { description: 'Get all users' })
  getAllUsers() {
    return this.userService.getUsers();
  }

  @ResolveField(() => Role, { name: 'role' })
  getRoleUser(@Parent() user: User) {
    return this.roleService.getRoleById(user.roleId);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const role = await this.roleService.getRoleByName(createUserData.roleName);
    if (!role) {
      throw new Error('Role not found');
    }
    return this.userService.createUser({
      ...createUserData,
      roleId: role.id,
    });
  }
}
