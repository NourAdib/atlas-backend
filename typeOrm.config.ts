import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/modules/user/user.entity';
import { Post } from './src/modules/post/post.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User, Post],
  migrations: ['./migrations/*{.ts,.js}']
});
