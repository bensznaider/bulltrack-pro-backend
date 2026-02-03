import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bull } from './bull.model';
import { BullsController } from './bulls.controller';
import { BullsService } from './bulls.service';

@Module({
  imports: [SequelizeModule.forFeature([Bull])],
  controllers: [BullsController],
  providers: [BullsService],
  exports: [BullsService],
})
export class BullsModule {}
