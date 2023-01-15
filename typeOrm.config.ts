import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/modules/user/user.entity';
import { Post } from './src/modules/post/entities/post.entity';
import { Scrapbook } from './src/modules/post/entities/scrapbook.entity';
import { Comment } from './src/modules/post/entities/comment.entity';
import { PostReport } from './src/modules/report/entities/post-report.entity';
import { UserReport } from './src/modules/report/entities/user-report.entity';
import { UserBan } from './src/modules/report/entities/user-ban.entity';
import { Appeal } from './src/modules/appeals/entities/appeal.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User, Post, Scrapbook, PostReport, UserReport, UserBan, Comment, Appeal],
  migrations: ['./migrations/*{.ts,.js}']
});
