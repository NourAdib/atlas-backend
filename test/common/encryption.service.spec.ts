import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../../src/common/services/encryption.service';

describe('EncryptionService Ideal Cases', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService]
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    return expect(service).toBeDefined();
  });

  it('should encrypt a password', async () => {
    const string = 'test';
    const hashedPassword = service.encryptPassword(string);

    expect(hashedPassword).not.toEqual(string);
  });

  it('should compares a password with a hashed password', async () => {
    const string = 'test';

    const hashedPassword = await service.encryptPassword(string);
    const compResult = await service.comparePasswords(string, hashedPassword);

    expect(compResult).toEqual(true);
  });
});

describe('EncryptionService Edge Cases', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService]
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    return expect(service).toBeDefined();
  });

  it('should compares a password with a hashed password', async () => {
    const string = 'test';
    const string2 = 'test2';
    const hashedPassword = await service.encryptPassword(string);
    const compResult = await service.comparePasswords(string2, hashedPassword);

    expect(compResult).toEqual(false);
  });
});
