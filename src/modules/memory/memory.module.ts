import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';

/**
 * Memory module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  controllers: [MemoryController],
  providers: [MemoryService]
})
export class MemoryModule {}
