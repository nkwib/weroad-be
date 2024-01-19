import { Module, forwardRef } from '@nestjs/common';
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
import { RolesModule } from './users/roles.module';
import { RolesGuard } from './auth/roles.guard';
import { ConfigModule } from '@nestjs/config';

const envMap = {
  development: '.env',
  production: '.env.production',
  test: '.env.test',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envMap[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Travel, Tour],
      synchronize: true,
    }),
    forwardRef(() => RolesModule),
    UsersModule,
    ToursModule,
    TravelsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [RolesGuard],
})
export class AppModule {}
