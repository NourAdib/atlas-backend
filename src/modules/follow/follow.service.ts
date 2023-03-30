import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { PageDto } from '../../common/dto/page.dto';
import { FollowStatus } from '../../constants/follow-status.enum';
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

  /**
   * The follow requests sent by the user
   * @param id the id of the user to follow
   * @param user the user requesting to follow
   * @returns the follow request
   */
  async requestFollow(id: string, user: any): Promise<FollowRequest> {
    const userToBeFollowed = await this.usersRepository.findOneBy({ id: id });

    const userRequestingFollow = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: [
        'following',
        'following.followed',
        'followRequestsSent',
        'followRequestsSent.requestedUser',
        'blockedBy.blockingUser'
      ]
    });

    if (!userToBeFollowed) {
      throw new BadRequestException('User not found');
    }

    if (!userRequestingFollow) {
      throw new BadRequestException('User not found');
    }

    if (userToBeFollowed.id === userRequestingFollow.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    userRequestingFollow.blockedBy.map((block) => {
      if (block.blockingUser.id === userToBeFollowed.id) {
        throw new BadRequestException('You have blocked by this user');
      }
    });

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

  /**
   * Accepts a follow request
   * @param id the id of the follow request
   * @param userToBeFollowed the user to be followed
   * @returns the follow request
   */
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

    const followedBy = await this.usersRepository.findOne({
      where: { id: follow.followedBy.id }
    });

    followedBy.followingCount = followedBy.followingCount + 1;

    await this.usersRepository.save(followedBy);

    const followed = await this.usersRepository.findOne({
      where: { id: follow.followed.id }
    });

    followed.followersCount = followed.followersCount + 1;

    await this.usersRepository.save(followed);

    return await this.followsRepository.save(follow);
  }

  /**
   * Rejects a follow request
   * @param id the id of the follow request
   * @param userToBeFollowed the user to be followed
   * @returns the follow request
   */
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

  /**
   * Gets the followers of a user
   * @param user the user to get the followers for
   * @param pageOptionsDto the page options
   * @returns the followers
   */
  async getFollowers(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followers', 'followers.followedBy']
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const users = dbUser.followers.map((follow) => {
      return follow.followedBy;
    });

    const itemCount: number = users.length;
    const entities: User[] = users;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the following of a user
   * @param user the user to get the following for
   * @param pageOptionsDto the page options
   * @returns the following
   */
  async getFollowing(user: any, pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following', 'following.followed']
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const users = dbUser.following.map((follow) => {
      return follow.followed;
    });

    const itemCount: number = users.length;
    const entities: User[] = users;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the follow requests received by a user
   * @param user the user to get the follow requests for
   * @param pageOptionsDto the page options
   * @returns the follow requests
   */
  async getFollowRequestsReceived(
    user: any,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<FollowRequest>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followRequestsReceived', 'followRequestsReceived.requestedBy']
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const itemCount: number = dbUser.followRequestsReceived.length;
    const entities: FollowRequest[] = dbUser.followRequestsReceived;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Gets the follow requests sent by a user
   * @param user the user to get the follow requests for
   * @param pageOptionsDto the page options
   * @returns the follow requests
   */
  async getFollowRequestsSent(
    user: any,
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<FollowRequest>> {
    const dbUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['followRequestsSent', 'followRequestsSent.requestedUser']
    });

    if (!dbUser) {
      throw new BadRequestException('User not found');
    }

    const itemCount: number = dbUser.followRequestsSent.length;
    const entities: FollowRequest[] = dbUser.followRequestsSent;

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Unfollows a user
   * @param id the id of the user to unfollow
   * @param user the user requesting the unfollow
   * @returns the follow request
   */
  async unfollow(id: string, user: any): Promise<DeleteResult> {
    const userToBeUnfollowed = await this.usersRepository.findOneBy({ id: id });
    const userRequestingUnfollow = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following', 'following.followed']
    });

    if (!userToBeUnfollowed) {
      throw new BadRequestException('User not found');
    }

    if (!userRequestingUnfollow) {
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

    userToBeUnfollowed.followersCount = userToBeUnfollowed.followersCount - 1;
    userRequestingUnfollow.followingCount = userRequestingUnfollow.followingCount - 1;

    await this.usersRepository.save(userToBeUnfollowed);
    await this.usersRepository.save(userRequestingUnfollow);

    return this.followsRepository.delete(followId);
  }
}
