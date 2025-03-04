import {
  healthDeclarationRepo,
  HealthDeclarationRepository,
} from '@/repositories/healthDeclaration.repository';
import { CreateHealthData } from '@/types';
import { processHDList } from '@/utils/processHDList';

export class HealthDeclarationService {
  constructor(private readonly repo: HealthDeclarationRepository) {}

  async createHealthDeclaration(data: CreateHealthData) {
    const result = await this.repo.createHealthDeclaration(data);

    if (!result) {
      throw Error('Create health declaration failed');
    }
  }

  async getHealthDeclarationList() {
    const result = await this.repo.getHealthDeclarationList();

    if (!result) {
      throw Error('Get health declaration list failed');
    }

    const processedResult = processHDList(result);

    return processedResult;
  }
}

export const healthDeclarationService = new HealthDeclarationService(
  healthDeclarationRepo
);
