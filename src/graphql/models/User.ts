import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  roleId: string;

  @Column({
    unique: true,
  })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  @Field(() => Role)
  role: Role;
}
