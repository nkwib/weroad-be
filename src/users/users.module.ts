import { RolesModule } from './roles.module';
import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { Role } from 'src/graphql/models/Role';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User, Role])],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UsersModule {}
