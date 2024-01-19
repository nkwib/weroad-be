import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err, user, info) {
    if (
      (!user && !err && !info) ||
      ['TokenExpiredError', 'Error'].includes(info?.name)
    ) {
      return null;
    }

    // Handle other errors (like invalid token)
    if (err || !user) {
      console.log(err);
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
