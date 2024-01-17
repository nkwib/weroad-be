import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mood } from './Mood';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tour } from './Tour';

@ObjectType()
@Entity('travel')
export class Travel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  slug: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(() => Int)
  numberOfDays: number;

  @Column({ type: 'json' })
  @Field(() => Mood)
  moods: Mood;

  @OneToMany(() => Tour, (tour) => tour.travel)
  @Field(() => [Tour], { nullable: true })
  tours?: Tour[];
}
