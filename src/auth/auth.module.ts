import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './AuthResolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: 'secretKey', // TODO: Move to env
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
})
export class AuthModule {}
