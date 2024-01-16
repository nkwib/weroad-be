import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { TourResolver } from './graphql/resolvers/TourResolver';
import { TravelResolver } from './graphql/resolvers/TravelResolver';
import { RoleResolver } from './graphql/resolvers/RoleResolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true,
    }),
  ],
  controllers: [],
  providers: [UserResolver, TourResolver, TravelResolver, RoleResolver],
})
export class AppModule {}
