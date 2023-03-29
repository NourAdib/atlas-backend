import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../src/modules/payment/payment.service';
import { PaymentController } from '../../src/modules/payment/payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
