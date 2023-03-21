import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/modules/user/entities/user.entity';
import { Post } from './src/modules/post/entities/post.entity';
import { Scrapbook } from './src/modules/post/entities/scrapbook.entity';
import { Like } from './src/modules/post/entities/post-like.entity';
import { Comment } from './src/modules/post/entities/comment.entity';
import { PostReport } from './src/modules/report/entities/post-report.entity';
import { UserReport } from './src/modules/report/entities/user-report.entity';
import { UserBan } from './src/modules/report/entities/user-ban.entity';
import { Appeal } from './src/modules/appeals/entities/appeal.entity';
import { Block } from './src/modules/block/entities/block.entity';
import { Follow } from './src/modules/follow/entities/follow.entity';
import { FollowRequest } from './src/modules/follow/entities/follow-request.entity';
import { Memory } from './src/modules/memory/entities/memory.entity';
import { Event } from './src/modules/event/entities/event.entity';
import { EventClue } from './src/modules/event/entities/eventClues.entity';
import { EventGoal } from './src/modules/event/entities/eventGoal.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [
    User,
    Post,
    Scrapbook,
    PostReport,
    UserReport,
    UserBan,
    Comment,
    Appeal,
    Block,
    Follow,
    FollowRequest,
    Like,
    Memory,
    Event,
    EventClue,
    EventGoal
  ],
  migrations: ['./migrations/*{.ts,.js}'],
  port: 33060
});
