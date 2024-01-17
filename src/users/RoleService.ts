import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/graphql/models/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.ensureRoles();
  }

  private async ensureRoles() {
    const roles = await this.roleRepository.find();
    for (const role of ['admin', 'user', 'editor']) {
      if (!roles.find((r) => r.name === role)) {
        const newRole = this.roleRepository.create({ name: role });
        await this.roleRepository.save(newRole);
      }
    }
  }

  getRoles() {
    return this.roleRepository.find();
  }

  getRoleById(id: string) {
    return this.roleRepository.findOneBy({ id });
  }

  getRoleByName(name: string) {
    return this.roleRepository.findOneBy({ name });
  }
}
