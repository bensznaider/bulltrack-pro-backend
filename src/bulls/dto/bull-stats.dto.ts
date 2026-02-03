import { IsInt, Max, Min } from 'class-validator';

export class BullStatsDto {
  @IsInt()
  @Min(0)
  @Max(100)
  crecimiento: number;

  @IsInt()
  @Min(0)
  @Max(100)
  facilidad_parto: number;

  @IsInt()
  @Min(0)
  @Max(100)
  reproduccion: number;

  @IsInt()
  @Min(0)
  @Max(100)
  moderacion: number;

  @IsInt()
  @Min(0)
  @Max(100)
  carcasa: number;
}
