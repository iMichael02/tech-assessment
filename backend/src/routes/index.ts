import { healthDeclarationController } from '@/controllers/healthDeclatation.controller';
import { validate } from '@/validators';
import { createHealthDeclarationSchema } from '@/validators/healthDeclaration.schema';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.post(
  '/health-declaration',
  validate(createHealthDeclarationSchema),
  healthDeclarationController.createHealthDeclaration
);
apiRoutes.get(
  '/health-declaration',
  healthDeclarationController.getHealthDeclarationList
);

export default apiRoutes;
