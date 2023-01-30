import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Base entity class
 * @description Base entity class for all entities
 */
export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
