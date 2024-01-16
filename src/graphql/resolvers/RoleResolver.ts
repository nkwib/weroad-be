import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Role } from '../models/Role';
import { mockRoles } from 'src/__mocks__/mockRoles';

@Resolver()
export class RoleResolver {
  @Query((returns) => Role, {
    nullable: true,
    description: 'Get role by ID',
  })
  getRoleById(
    @Args('id')
    id: string,
  ): Role {
    return mockRoles.find((role) => role.id === id);
  }

  @Query((returns) => [Role], {
    description: 'Get all roles',
  })
  getAllRoles(): Role[] {
    return mockRoles;
  }
}
