import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Block } from './entities/block.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async blockUser(id: string, user: any): Promise<Block> {
    const userToBeBlocked = await this.userRepository.findOneBy({ id: id });

    if (!userToBeBlocked) {
      throw new BadRequestException('User not found');
    }

    if (userToBeBlocked.id === user.id) {
      throw new BadRequestException('You cannot block yourself');
    }

    const blockingUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['blocks', 'blocks.blockedUser']
    });

    blockingUser.blocks.map((block) => {
      if (block.blockedUser.id === userToBeBlocked.id) {
        throw new BadRequestException('User already blocked');
      }
    });

    const newBlock = new Block();
    newBlock.blockedUser = userToBeBlocked;
    newBlock.blockingUser = blockingUser;

    return await this.blockRepository.save(newBlock);
  }

  async unblockUser(id: string, user: any): Promise<DeleteResult> {
    const userToBeUnblocked = await this.userRepository.findOneBy({ id: id });

    if (!userToBeUnblocked) {
      throw new BadRequestException('User not found');
    }

    if (userToBeUnblocked.id === user.id) {
      throw new BadRequestException('You cannot unblock yourself');
    }

    const unblockingUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['blocks', 'blocks.blockedUser']
    });

    let userFound = false;
    let blockId = '';

    unblockingUser.blocks.map((block) => {
      if (block.blockedUser.id === userToBeUnblocked.id) {
        userFound = true;
        blockId = block.id;
      }
    });

    if (!userFound) {
      throw new BadRequestException('User not blocked');
    }

    return await this.blockRepository.delete({ id: blockId });
  }
}
