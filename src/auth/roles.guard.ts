import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user; // Assuming user is attached to the request
    if (!user) return false;

    const hasRole = this.allowedRoles.some((role) => user.roles.includes(role));
    return user && hasRole;
  }
}
