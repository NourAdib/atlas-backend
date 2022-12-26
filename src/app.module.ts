import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { LocalStrategy } from './modules/auth/strategies/local.strategy';

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
        entities: [User],
        synchronize: false,
        autoLoadEntities: true,
        options: { encrypt: false },
        //*Migrations Settings
        //Migrations Table Name
        migrationsTableName: 'migrations',
        //Migrations Folder
        migrations: ['dist/migrations/*{.ts,.js}'],
        //Automatically run migrations on app start if needed
        migrationsRun: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppService, LocalStrategy]
})
export class AppModule {}
