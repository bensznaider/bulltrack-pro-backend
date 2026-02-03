import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateBullDto } from './create-bull.dto';

export class BulkCreateBullsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateBullDto)
  bulls: CreateBullDto[];
}
