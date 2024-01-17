import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Travel } from './Travel';

@ObjectType()
@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  travelId: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  startingDate: string;

  @Column()
  @Field()
  endingDate: string;

  @Column()
  @Field(() => Int)
  price: number;

  @ManyToOne(() => Travel)
  @JoinColumn({ name: 'travelId' })
  @Field(() => Travel)
  travel: Travel;
}
