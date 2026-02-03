import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BullsModule } from './bulls/bulls.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    // Makes .env variables available app-wide
    ConfigModule.forRoot({ isGlobal: true }),
    // Database connection
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        autoLoadModels: true,
        // Set to false in order to control schema changes via npm run db:sync scripts
        synchronize: false,
        logging: false,
      }),
    }),
    UsersModule,
    AuthModule,
    BullsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
