import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../../src/modules/payment/payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/modules/user/entities/user.entity';
import { NotificationService } from '../../src/modules/notification/notification.service';

describe('PaymentService', () => {
  let service: PaymentService;
  const userRepoToken = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        NotificationService,
        {
          provide: userRepoToken,
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
