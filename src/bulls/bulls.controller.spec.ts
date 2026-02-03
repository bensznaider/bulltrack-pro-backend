import { Test, TestingModule } from '@nestjs/testing';
import { BullsController } from './bulls.controller';

describe('BullsController', () => {
  let controller: BullsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BullsController],
    }).compile();

    controller = module.get<BullsController>(BullsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
