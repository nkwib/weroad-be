import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/User';
import { Role } from './graphql/models/Role';
import { Travel } from './graphql/models/Travel';
import { Tour } from './graphql/models/Tour';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tour.module';
import { TravelsModule } from './travels/travel.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'weroad_user',
      password: 'weroad',
      database: 'weroad',
      entities: [User, Role, Travel, Tour],
      synchronize: true,
    }),
    UsersModule,
    ToursModule,
    TravelsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
