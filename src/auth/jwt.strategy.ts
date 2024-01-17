import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // TODO: Move to env
    });
  }

  async validate(payload) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,mutation {
        login(loginUserInput:{
          username: "admin"
          password: "password"
        }) {
          token
          user {
            username
            role {
              name
            }
          }
        }
      }
    };
  }
}
