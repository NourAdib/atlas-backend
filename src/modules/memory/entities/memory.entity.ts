import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Visibility } from '../../../constants/visibility.enum';
import { Point } from 'geojson';

@Entity()
export class Memory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, default: 0 })
  longitude: number;

  @Column()
  visibility: Visibility;

  @Column({ type: 'longtext' })
  imageUrl: string = '';

  @Column({ default: '' })
  imageId: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  imageExpiryDate: Date;

  //A memory can be made my one user but a user can have many memories
  @ManyToOne(() => User, (user) => user.memories, {
    onDelete: 'CASCADE'
  })
  user: User;
}
