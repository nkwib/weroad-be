import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './RoleService';
import { Role } from 'src/graphql/models/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService], // this makes sure that the RoleService is initialized before the UsersModule
})
export class RolesModule {}
