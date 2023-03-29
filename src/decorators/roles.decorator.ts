import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants/role.enum';
/**
 * ROLES_KEY is the key used to store the roles in the metadata
 */
export const ROLES_KEY = 'roles';
/**
 * @param roles the roles to be stored in the metadata
 * @returns Checks if the roles are a part of the Role enum
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
