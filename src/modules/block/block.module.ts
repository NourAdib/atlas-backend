import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { Block } from './entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

/**
 * Block module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Block, User])],
  providers: [BlockService],
  controllers: [BlockController]
})
export class BlockModule {}
