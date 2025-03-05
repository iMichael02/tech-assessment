import { CreateHealthData } from '@/types';
import { PrismaClient } from '@prisma/client';
import prisma from 'prisma/prisma.client';

export class HealthDeclarationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createHealthDeclaration(data: CreateHealthData) {
    return await this.prisma.healthDeclaration.create({
      data: {
        name: data.name,
        temperature: data.temperature,
        contactedWithCovid19Suspects: data.contactedWithCovid19Suspects,
        Symptoms: {
          connect: data.symptoms.map((symptomName) => ({
            name: symptomName,
          })),
        },
      },
      select: {
        id: true,
      },
    });
  }

  async getHealthDeclarationList() {
    return await this.prisma.healthDeclaration.findMany({
      include: {
        Symptoms: true,
      },
    });
  }
}

export const healthDeclarationRepo = new HealthDeclarationRepository(prisma);
