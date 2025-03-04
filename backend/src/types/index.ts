import { Prisma } from '@prisma/client';

type CreateHealthData = Prisma.HealthDeclarationCreateInput & {
  symptoms: string[];
};

type UnProcessedHDList = ({
  Symptoms: {
    name: string;
    id: string;
  }[];
} & {
  name: string;
  id: string;
  temperature: number;
  contactedWithCovid19Suspects: boolean;
})[];

export { CreateHealthData, UnProcessedHDList };
