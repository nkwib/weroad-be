import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './RoleService';
import { Role } from '../graphql/models/Role';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule), TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RolesModule {}
