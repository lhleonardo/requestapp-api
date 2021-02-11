import { Test, TestingModule } from '@nestjs/testing';
import { PayerController } from './payer.controller';

describe('PayerController', () => {
  let controller: PayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayerController],
    }).compile();

    controller = module.get<PayerController>(PayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
