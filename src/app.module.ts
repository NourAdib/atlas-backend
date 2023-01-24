import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { LocalStrategy } from './modules/auth/strategies/local.strategy';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/entities/post.entity';
import { Scrapbook } from './modules/post/entities/scrapbook.entity';
import { Comment } from './modules/post/entities/comment.entity';
import { PostReport } from './modules/report/entities/post-report.entity';
import { UserReport } from './modules/report/entities/user-report.entity';
import { ReportModule } from './modules/report/report.module';
import { UserBan } from './modules/report/entities/user-ban.entity';
import { Appeal } from './modules/appeals/entities/appeal.entity';
import { AppealsModule } from './modules/appeals/appeals.module';
import { BlockModule } from './modules/block/block.module';
import { Block } from './modules/block/entities/block.entity';
import { Follow } from './modules/follow/entities/follow.entity';
import { FollowRequest } from './modules/follow/entities/follow-request.entity';
import { FollowModule } from './modules/follow/follow.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { FeedModule } from './modules/feed/feed.module';
import { Like } from './modules/post/entities/post-like.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      //We import the ConfigModule to use the ConfigService to acceess the environment variables
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        //*Database Settings
        type: 'mysql',
        //We get get the value of the environment variable DATABASE_HOST
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
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
          Like
        ],
        synchronize: false,
        autoLoadEntities: true,
        options: { encrypt: false },
        //*Migrations Settings
        //Migrations Table Name
        migrationsTableName: 'migrations',
        //Migrations Folder
        migrations: ['../migrations/*{.ts,.js}'],
        //Automatically run migrations on app start if needed
        migrationsRun: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule,
    PostModule,
    ReportModule,
    AppealsModule,
    BlockModule,
    FollowModule,
    NotificationModule,
    AnalyticsModule,
    FeedModule
  ],
  controllers: [],
  providers: [AppService, LocalStrategy]
})
export class AppModule {}
