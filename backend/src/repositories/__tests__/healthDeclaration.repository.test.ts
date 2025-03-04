import { HealthDeclarationRepository } from '../healthDeclaration.repository';
import { prismaMock } from '../../../prisma/singleton';

describe('HealthDeclarationRepository', () => {
  let repo: HealthDeclarationRepository;

  beforeEach(() => {
    repo = new HealthDeclarationRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHealthDeclaration', () => {
    it('should return created health declaration', async () => {
      const mockData = {
        id: '1',
        name: 'test',
        temperature: 39,
        contactedWithCovid19Suspects: true,
        symptoms: ['cough'],
      };

      prismaMock.healthDeclaration.create.mockResolvedValue(mockData);

      const actual = await repo.createHealthDeclaration(mockData);

      expect(mockData).toEqual(actual);
    });

    it('should throw an error if failed to create new health declaration', async () => {
      const mockData = {
        id: '1',
        name: 'test',
        temperature: 39,
        contactedWithCovid19Suspects: true,
        symptoms: ['cough'],
      };

      prismaMock.healthDeclaration.create.mockRejectedValue(new Error());

      await expect(repo.createHealthDeclaration(mockData)).rejects.toThrow(
        Error
      );
    });
  });

  describe('getHealthDeclarationList', () => {
    it('should return health declaration list', async () => {
      const mockData = [
        {
          id: '1',
          name: 'test',
          temperature: 39,
          contactedWithCovid19Suspects: true,
          symptoms: ['cough'],
        },
        {
          id: '1',
          name: 'test',
          temperature: 39,
          contactedWithCovid19Suspects: true,
          symptoms: ['cough'],
        },
      ];

      prismaMock.healthDeclaration.findMany.mockResolvedValue(mockData);

      const actual = await repo.getHealthDeclarationList();

      expect(mockData).toEqual(actual);
    });

    it('should throw an error if failed to retrieve health declaration list', async () => {
      prismaMock.healthDeclaration.findMany.mockRejectedValue(new Error());

      await expect(repo.getHealthDeclarationList()).rejects.toThrow(Error);
    });
  });
});
