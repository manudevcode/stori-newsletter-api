import { Test, TestingModule } from '@nestjs/testing';
import { UnsubscribeController } from './unsubscribe.controller';

describe('UnsubscribeController', () => {
  let controller: UnsubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnsubscribeController],
    }).compile();

    controller = module.get<UnsubscribeController>(UnsubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
