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

  @Column({ type: 'boolean', default: false })
  @Field()
  isPublic: boolean;

  @Column()
  @Field()
  slug: string;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'text' })
  @Field()
  description: string;

  @Column()
  @Field(() => Int)
  numberOfDays: number;

  @Column({ type: 'text' })
  @Field({
    defaultValue:
      'https://images.unsplash.com/photo-1692641995795-59026e35e458', // default image
  })
  img: string;

  @Column({ type: 'json' })
  @Field(() => Mood)
  moods: Mood;

  @OneToMany(() => Tour, (tour) => tour.travel, { cascade: true })
  @Field(() => [Tour], { nullable: true })
  tours?: Tour[];
}
