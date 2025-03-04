import { HealthDeclarationService } from '@/services/healthDeclaration.service';
import { healthDeclarationRepo as repo } from '@/repositories/healthDeclaration.repository';
import { processHDList } from '@/utils/processHDList';

jest.mock('@/repositories/healthDeclaration.repository');

describe('HealthDeclarationService', () => {
  let service: HealthDeclarationService;
  const mockData = {
    id: '1',
    name: 'test',
    temperature: 39,
    contactedWithCovid19Suspects: true,
    symptoms: ['cough'],
  };

  beforeEach(() => {
    service = new HealthDeclarationService(repo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHealthDeclaration', () => {
    it('should call createHealthDeclaration on the repository and return data on success', async () => {
      repo.createHealthDeclaration = jest.fn().mockResolvedValue({});

      await service.createHealthDeclaration(mockData);

      expect(repo.createHealthDeclaration).toHaveBeenCalledWith(mockData);
    });

    it('should throw an error when createHealthDeclaration fails', async () => {
      repo.createHealthDeclaration = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(service.createHealthDeclaration(mockData)).rejects.toThrow(
        Error
      );
      expect(repo.createHealthDeclaration).toHaveBeenCalledWith(mockData);
    });

    it('should throw an error when createHealthDeclaration returns null', async () => {
      repo.createHealthDeclaration = jest.fn().mockResolvedValue(null);

      await expect(service.createHealthDeclaration(mockData)).rejects.toThrow(
        Error
      );
      expect(repo.createHealthDeclaration).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getHealthDeclarationList', () => {
    it('should return health declaration list from repository', async () => {
      const mockList = [
        {
          id: mockData.id,
          name: mockData.name,
          temperature: mockData.temperature,
          contactedWithCovid19Suspects: mockData.contactedWithCovid19Suspects,
          Symptoms: [
            {
              id: '1',
              name: 'cough',
            },
          ],
        },
        {
          id: mockData.id,
          name: mockData.name,
          temperature: mockData.temperature,
          contactedWithCovid19Suspects: mockData.contactedWithCovid19Suspects,
          Symptoms: [
            {
              id: '1',
              name: 'cough',
            },
          ],
        },
      ];
      repo.getHealthDeclarationList = jest.fn().mockResolvedValue(mockList);

      const actual = await service.getHealthDeclarationList();

      expect(repo.getHealthDeclarationList).toHaveBeenCalled();
      expect(actual).toEqual(processHDList(mockList));
    });

    it('should throw an error when getHealthDeclarationList fails', async () => {
      repo.getHealthDeclarationList = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(service.getHealthDeclarationList()).rejects.toThrow(Error);
      expect(repo.getHealthDeclarationList).toHaveBeenCalled();
    });

    it('should throw an error when getHealthDeclarationList returns null', async () => {
      repo.getHealthDeclarationList = jest.fn().mockResolvedValue(null);

      await expect(service.getHealthDeclarationList()).rejects.toThrow(Error);
      expect(repo.getHealthDeclarationList).toHaveBeenCalled();
    });
  });
});
