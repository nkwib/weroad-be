import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

export const Roles = (...roles: string[]) => {
  return UseGuards(new RolesGuard(roles));
};
