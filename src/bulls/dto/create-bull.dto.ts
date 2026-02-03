import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { BullStatsDto } from './bull-stats.dto';

export class CreateBullDto {
  @IsString()
  caravana: string;

  @IsString()
  nombre: string;

  @IsIn(['vaquillona', 'vaca'])
  uso: 'vaquillona' | 'vaca';

  @IsIn(['propio', 'catalogo'])
  origen: 'propio' | 'catalogo';

  @IsIn(['negro', 'colorado'])
  pelaje: 'negro' | 'colorado';

  @IsString()
  raza: string;

  @IsInt()
  @Min(0)
  edad_meses: number;

  @IsOptional()
  @IsString()
  caracteristica_destacada?: string | null;

  @ValidateNested()
  @Type(() => BullStatsDto)
  stats: BullStatsDto;
}
