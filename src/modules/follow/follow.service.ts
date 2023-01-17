import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FollowStatus } from 'src/constants/follow-status.enum';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FollowRequest } from './entities/follow-request.entity';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(FollowRequest)
    private followRequestsRepository: Repository<FollowRequest>,

    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>
  ) {}

  async requestFollow(id: string, user: any): Promise<FollowRequest> {
    const userToBeFollowed = await this.usersRepository.findOneBy({ id: id });
    const userRequestingFollow = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: [
        'following',
        'following.followed',
        'followRequestsSent',
        'followRequestsSent.requestedUser'
      ]
    });

    if (!userToBeFollowed) {
      throw new BadRequestException('User not found');
    }

    if (userToBeFollowed.id === userRequestingFollow.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    userRequestingFollow.followRequestsSent.map((followRequest) => {
      if (
        followRequest.requestedUser.id === userToBeFollowed.id &&
        followRequest.status === FollowStatus.Pending
      ) {
        throw new BadRequestException('You already request to follow this user');
      }
    });

    userRequestingFollow.following.map((follow) => {
      if (follow.followed.id === userToBeFollowed.id) {
        throw new BadRequestException('You are already following this user');
      }
    });

    const followRequest = new FollowRequest();
    followRequest.requestedBy = user;
    followRequest.requestedUser = userToBeFollowed;

    return await this.followRequestsRepository.save(followRequest);
  }

  async acceptFollow(id: string, userToBeFollowed: any): Promise<Follow> {
    const followRequest = await this.followRequestsRepository.findOne({
      where: { id: id },
      relations: ['requestedBy', 'requestedUser']
    });

    if (!followRequest) {
      throw new BadRequestException('Follow request not found');
    }

    if (followRequest.requestedUser.id !== userToBeFollowed.id) {
      throw new ForbiddenException('You cannot accept this follow request');
    }

    if (!followRequest.requestedBy) {
      throw new BadRequestException('Follow request is no longer valid');
    }

    if (followRequest.status === FollowStatus.Accepted) {
      throw new BadRequestException('This follow request has already been accepted');
    }

    if (followRequest.status === FollowStatus.Rejected) {
      throw new BadRequestException('This follow request has been rejected');
    }

    await this.followRequestsRepository.update(followRequest.id, { status: FollowStatus.Accepted });

    const follow = new Follow();
    follow.followedBy = followRequest.requestedBy;
    follow.followed = followRequest.requestedUser;

    return await this.followsRepository.save(follow);
  }

  async rejectFollow(id: string, userToBeFollowed: any): Promise<UpdateResult> {
    const followRequest = await this.followRequestsRepository.findOne({
      where: { id: id },
      relations: ['requestedBy', 'requestedUser']
    });

    if (!followRequest) {
      throw new BadRequestException('Follow request not found');
    }

    if (followRequest.requestedUser.id !== userToBeFollowed.id) {
      throw new ForbiddenException('You cannot reject this follow request');
    }

    if (!followRequest.requestedBy) {
      throw new BadRequestException('Follow request is no longer valid');
    }

    if (followRequest.status === FollowStatus.Accepted) {
      throw new BadRequestException('This follow request has been accepted');
    }

    if (followRequest.status === FollowStatus.Rejected) {
      throw new BadRequestException('This follow request has already been rejected');
    }

    return this.followRequestsRepository.update(followRequest.id, {
      status: FollowStatus.Rejected
    });
  }

  async getFollowers(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followers', 'followers.followedBy']
    });

    const users = dbUser.followers.map((follow) => {
      return follow.followedBy;
    });

    const itemCount: number = users.length;
    const entities: User[] = users;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getFollowing(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following', 'following.followed']
    });

    const users = dbUser.following.map((follow) => {
      return follow.followed;
    });

    const itemCount: number = users.length;
    const entities: User[] = users;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getFollowRequestsReceived(
    user: any,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<FollowRequest>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followRequestsReceived', 'followRequestsReceived.requestedBy']
    });

    const itemCount: number = dbUser.followRequestsReceived.length;
    const entities: FollowRequest[] = dbUser.followRequestsReceived;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getFollowRequestsSent(
    user: any,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<FollowRequest>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followRequestsSent', 'followRequestsSent.requestedUser']
    });

    const itemCount: number = dbUser.followRequestsSent.length;
    const entities: FollowRequest[] = dbUser.followRequestsSent;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async unfollow(id: string, user: any): Promise<DeleteResult> {
    const userToBeUnfollowed = await this.usersRepository.findOneBy({ id: id });
    const userRequestingUnfollow = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following', 'following.followed']
    });

    if (!userToBeUnfollowed) {
      throw new BadRequestException('User not found');
    }

    if (userToBeUnfollowed.id === userRequestingUnfollow.id) {
      throw new BadRequestException('You cannot unfollow yourself');
    }

    let isFollowing = false;
    let followId = '';

    userRequestingUnfollow.following.map((follow) => {
      if (follow.followed.id === userToBeUnfollowed.id) {
        isFollowing = true;
        followId = follow.id;
      }
    });

    if (!isFollowing) {
      throw new BadRequestException('You are not following this user');
    }

    return this.followsRepository.delete(followId);
  }
}
