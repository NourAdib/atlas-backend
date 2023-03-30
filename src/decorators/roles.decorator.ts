import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/role.enum';

/**
 * Roles Decorator
 * @description This decorator is used to set the roles for a route
 * @param roles the roles to set
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
