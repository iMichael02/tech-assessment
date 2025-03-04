import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { APIResponse } from '../utils/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { messages } from '@/constants';

export const errorHandler: ErrorRequestHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorRes = new APIResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    messages.INTERNAL_SERVER_ERROR
  );

  errorRes.send(res);
};
