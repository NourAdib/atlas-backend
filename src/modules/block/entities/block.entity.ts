import { BaseEntity } from '../../../common/entities/base.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

/**
 * Block entity
 */
@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //A block can only be done by one user but a user can have many blocks
  @ManyToOne(() => User, (user) => user.blocks, {
    onDelete: 'CASCADE'
  })
  blockingUser: User;

  //A block can only be done by one user but a user can have many blocks
  @ManyToOne(() => User, (user) => user.blockedBy, {
    onDelete: 'CASCADE'
  })
  blockedUser: User;
}
