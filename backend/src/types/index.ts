import { Prisma } from '@prisma/client';

type CreateHealthData = Prisma.HealthDeclarationCreateInput & {
  symptoms: string[];
};

export { CreateHealthData };
