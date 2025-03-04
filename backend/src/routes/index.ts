import { healthDeclarationController } from '@/controllers/healthDeclatation.controller';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.post(
  '/health-declaration',
  healthDeclarationController.createHealthDeclaration
);
apiRoutes.get(
  '/health-declaration',
  healthDeclarationController.getHealthDeclarationList
);

export default apiRoutes;
