import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mood {
    @Field((type) => Int)
    nature: number;
    
    @Field((type) => Int)
    relax: number;
    
    @Field((type) => Int)
    history: number;
    
    @Field((type) => Int)
    culture: number;
    
    @Field((type) => Int)
    party: number;
}