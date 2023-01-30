import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseStorageService } from 'src/common/services/firebase-storage.service';
import { BanStatus } from 'src/constants/ban-status.enum';
import { Repository, Not, LessThan } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { UserBan } from '../report/entities/user-ban.entity';
import { User } from '../user/entities/user.entity';

/**
 * This service is used to run bulk tasks requiring a lot of processing power
 * This will run once everyday at 12:00:00 AM server time
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(UserBan)
    private userBanRepository: Repository<UserBan>
  ) {}

  /**
   * Runs at the specified interval
   * Updates the profile picture URL for all users whose profile picture will expire tomorrow
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateUserProfileURLs() {
    const tomorrow = new Date(Date.now());
    tomorrow.setDate(tomorrow.getDate() + 1);

    await this.userRepository
      .find({
        where: {
          profilePictureId: Not(''),
          profilePictureExpiryDate: LessThan(tomorrow)
        }
      })
      .then(async (users) => {
        console.log(users.length);

        for (let i = 0; i < users.length; i++) {
          const user = users[i];

          if (user.profilePictureId) {
            if (user.profilePictureExpiryDate < new Date(Date.now())) {
              const { url, expiryDate } = await new FirebaseStorageService().getSignedURL(
                user.id,
                user.profilePictureId
              );

              user.profilePictureExpiryDate = new Date(expiryDate);
              user.profilePictureUrl = url;

              await this.userRepository.save(user);
            }
          }
        }
      });
  }

  /**
   * Runs at the specified interval
   * Updates the post picture URL for all posts whose picture will expire tomorrow
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateUserPostURLs() {
    const tomorrow = new Date(Date.now());
    tomorrow.setDate(tomorrow.getDate() + 1);

    await this.postRepository
      .find({
        where: {
          imageId: Not(''),
          imageExpiryDate: LessThan(tomorrow)
        },
        relations: ['postedBy']
      })
      .then(async (posts) => {
        console.log(posts.length);
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i];

          if (post.imageId) {
            if (post.imageExpiryDate < new Date(Date.now())) {
              const { url, expiryDate } = await new FirebaseStorageService().getPostImageSignedURL(
                post.imageId,
                post.postedBy.id,
                post.id
              );

              post.imageExpiryDate = new Date(expiryDate);
              post.imageUrl = url;

              await this.postRepository.save(post);
            }
          }
        }
      });
  }

  /**
   * Runs at the specified interval
   * Removes the bans on users whose ban has expired
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredBans() {
    await this.userBanRepository
      .find({
        where: {
          status: BanStatus.Active,
          endDate: LessThan(new Date(Date.now()))
        }
      })
      .then(async (bans) => {
        for (let i = 0; i < bans.length; i++) {
          const ban = bans[i];

          if (ban.endDate < new Date(Date.now())) {
            await this.userBanRepository.update(ban.id, { status: BanStatus.Expired });
          }
        }
      });
  }
}
