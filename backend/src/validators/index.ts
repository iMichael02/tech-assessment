import { catchAsync } from '@/utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.Schema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(error);
    }

    next();
  });
};
