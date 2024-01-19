import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { Repository } from 'typeorm';
import { CreateUserInput } from './CreateUserInput';
import { Role } from '../graphql/models/Role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.ensureAdminUser();
  }

  private async ensureAdminUser() {
    const adminExists = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('role.name = :name', { name: 'admin' })
      .getCount();
    if (!adminExists) {
      const adminRole = await this.roleRepository.findOneBy({ name: 'admin' });
      const newAdmin = this.userRepository.create({
        username: process.env.ADMIN_USERNAME,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        role: adminRole,
      });
      await this.userRepository.save(newAdmin);
    } else {
      console.log('Skipping Admin Creation - user already exists.');
    }
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(user: CreateUserInput & { roleId: string }) {
    const newUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
    const createdUser = await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
}
