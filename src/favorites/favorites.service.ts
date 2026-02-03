import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bull } from '../bulls/bull.model';
import { Favorite } from './favorite.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite) private readonly favoriteModel: typeof Favorite,
    @InjectModel(Bull) private readonly bullModel: typeof Bull,
  ) {}

  async listFavoriteBullIds(userId: number) {
    const favorites = await this.favoriteModel.findAll({
      where: { userId },
      attributes: ['bullId'],
    });

    return favorites.map((item) => item.bullId);
  }

  async toggle(userId: number, bullId: number) {
    const bullExists = await this.bullModel.findByPk(bullId);
    if (!bullExists) throw new NotFoundException('Bull not found');

    const existing = await this.favoriteModel.findOne({
      where: { userId, bullId },
    });

    if (existing) {
      await existing.destroy();
      return { ok: true, favorited: false };
    }

    await this.favoriteModel.create({ userId, bullId });
    return { ok: true, favorited: true };
  }
}
