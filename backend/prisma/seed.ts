import prisma from './prisma.client';
import { readFileSync } from 'fs';
import { CreateHealthData } from '../src/types';

const cwd = process.cwd();

const seed = async () => {
  await prisma.healthDeclaration.deleteMany();
  await prisma.symptom.deleteMany();

  const symptomData = readFileSync(
    cwd + '/prisma/mocks/symptoms.json',
    'utf-8'
  );
  const seedSymptomData = JSON.parse(symptomData);

  await prisma.symptom.createMany({ data: seedSymptomData });

  const healthDeclarationData = readFileSync(
    cwd + '/prisma/mocks/healthDeclare.json',
    'utf-8'
  );
  const seedHealthData: CreateHealthData[] = JSON.parse(healthDeclarationData);

  await Promise.allSettled(
    seedHealthData.map(async (item) => {
      return await prisma.healthDeclaration.create({
        data: {
          id: item.id,
          name: item.name,
          temperature: item.temperature,
          contactedWithCovid19Suspects: item.contactedWithCovid19Suspects,
          Symptoms: {
            connect: item.symptoms.map((symptomName) => ({
              name: symptomName,
            })),
          },
        },
      });
    })
  );
};

seed();
