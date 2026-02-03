import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { BullsService } from './bulls.service';
import { CreateBullDto } from './dto/create-bull.dto';
import { BulkCreateBullsDto } from './dto/bulk-create-bulls.dto';

@Controller('bulls')
export class BullsController {
  constructor(private readonly bullsService: BullsService) {}

  @Post()
  createOne(@Body() dto: CreateBullDto) {
    return this.bullsService.createOne(dto);
  }

  @Post('bulk')
  createBulk(@Body() dto: BulkCreateBullsDto) {
    return this.bullsService.createBulk(dto.bulls);
  }

  @Get()
  list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('origen') origen?: 'propio' | 'catalogo',
    @Query('uso') uso?: 'vaquillona' | 'vaca',
    @Query('pelaje') pelaje?: 'negro' | 'colorado',
    @Query('sort') sort?: 'score_desc' | 'score_asc',
  ) {
    return this.bullsService.list({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      origen,
      uso,
      pelaje,
      sort,
    });
  }
}
