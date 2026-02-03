import { Test, TestingModule } from '@nestjs/testing';
import { BullsService } from './bulls.service';

describe('BullsService', () => {
  let service: BullsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullsService],
    }).compile();

    service = module.get<BullsService>(BullsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
