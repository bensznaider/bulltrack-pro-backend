import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bull } from './bull.model';
import { BullsController } from './bulls.controller';
import { BullsService } from './bulls.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [SequelizeModule.forFeature([Bull]), FavoritesModule],
  controllers: [BullsController],
  providers: [BullsService],
  exports: [BullsService],
})
export class BullsModule {}
