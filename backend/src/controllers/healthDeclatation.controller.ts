import {
  healthDeclarationService,
  HealthDeclarationService,
} from '@/services/healthDeclaration.service';
import { APIResponse } from '@/utils/ApiResponse';
import { catchAsync } from '@/utils/catchAsync';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HealthDeclarationController {
  constructor(private readonly service: HealthDeclarationService) {}

  createHealthDeclaration = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    await this.service.createHealthDeclaration(data);

    return new APIResponse(StatusCodes.NO_CONTENT, 'Success').send(res);
  });

  getHealthDeclarationList = catchAsync(async (req: Request, res: Response) => {
    const result = await this.service.getHealthDeclarationList();

    return new APIResponse(StatusCodes.OK, result).send(res);
  });
}

export const healthDeclarationController = new HealthDeclarationController(
  healthDeclarationService
);
