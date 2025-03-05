import { HealthDeclarationController } from '../healthDeclatation.controller';
import { HealthDeclarationService } from '@/services/healthDeclaration.service';
import { ApiResponse } from '@/utils/ApiResponse';
import { messages } from '@/constants/paths';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '@/utils/catchAsync';

jest.mock('@/utils/ApiResponse');

describe('HealthDeclarationController', () => {
  let service: jest.Mocked<HealthDeclarationService>;
  let controller: HealthDeclarationController;
  let req: any, res: any, next: any;
  const mockData = {
    name: 'Dimmu Borgir',
    temperature: 39,
    symptoms: ['cough', 'headaches'],
    contactedWithCovid19Suspects: true,
  };

  beforeEach(() => {
    service = {
      createHealthDeclaration: jest.fn(),
      getHealthDeclarationList: jest.fn(),
    } as any;

    controller = new HealthDeclarationController(service);
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHealthDeclaration', () => {
    it('should register students successfully', async () => {
      req.body = mockData;

      await controller.createHealthDeclaration(req, res, next);

      expect(service.createHealthDeclaration).toHaveBeenCalledWith(mockData);
      expect(ApiResponse).toHaveBeenCalledWith(
        StatusCodes.NO_CONTENT,
        messages.SUCCESS
      );
    });

    it('should throw an error when createHealthDeclaration fails', async () => {
      req.body = mockData;
      service.createHealthDeclaration.mockRejectedValue(new Error('Error'));

      await controller.createHealthDeclaration(req, res, next);

      expect(service.createHealthDeclaration).toHaveBeenCalledWith(mockData);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getHealthDeclarationList', () => {
    it('should get common students successfully', async () => {
      service.getHealthDeclarationList.mockResolvedValue([mockData]);

      await controller.getHealthDeclarationList(req, res, next);

      expect(service.getHealthDeclarationList).toHaveBeenCalled();
      expect(ApiResponse).toHaveBeenCalledWith(StatusCodes.OK, [mockData]);
    });

    it('should throw an error when getHealthDeclarationList fails', async () => {
      service.getHealthDeclarationList.mockRejectedValue(new Error('Error'));

      await controller.getHealthDeclarationList(req, res, next);

      expect(service.getHealthDeclarationList).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
