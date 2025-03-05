import { HEALTH_DECLARATION_PATH } from '@/constants/paths';
import { healthDeclarationController } from '@/controllers/healthDeclatation.controller';
import { validate } from '@/validators';
import { createHealthDeclarationSchema } from '@/validators/healthDeclaration.schema';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.post(
  HEALTH_DECLARATION_PATH,
  validate(createHealthDeclarationSchema),
  healthDeclarationController.createHealthDeclaration
);
apiRoutes.get(
  HEALTH_DECLARATION_PATH,
  healthDeclarationController.getHealthDeclarationList
);

export default apiRoutes;
