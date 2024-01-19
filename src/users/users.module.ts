import { RolesModule } from './roles.module';
import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { Role } from '../graphql/models/Role';
import { RoleService } from './RoleService';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User, Role])],
  controllers: [],
  providers: [UserResolver, UserService, RoleService],
})
export class UsersModule {}
