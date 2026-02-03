import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../auth/types/auth-user.type';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(@Req() req: { user: AuthUser }) {
    return this.favoritesService.listFavoriteBullIds(req.user.sub);
  }

  @Post(':bullId')
  toggle(@Req() req: { user: AuthUser }, @Param('bullId') bullId: string) {
    return this.favoritesService.toggle(req.user.sub, Number(bullId));
  }
}
