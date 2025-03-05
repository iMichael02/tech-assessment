import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { messages } from '@/constants/messages';
import Joi from 'joi';
import { Prisma } from '@prisma/client';

export const errorHandler: ErrorRequestHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorRes;

  if (Joi.isError(err)) {
    const { details } = err;
    const errors = details.map((detail) => detail.message);

    errorRes = new ApiResponse(StatusCodes.BAD_REQUEST, errors);
  }

  if (!errorRes && err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
      case 'P2003':
      case 'P2004':
      case 'P2005':
      case 'P2006':
      case 'P2025':
        errorRes = new ApiResponse(StatusCodes.BAD_REQUEST, err.message);
        break;
      default:
        errorRes = new ApiResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          messages.INTERNAL_SERVER_ERROR
        );
        break;
    }
  }

  if (!errorRes) {
    errorRes = new ApiResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      messages.INTERNAL_SERVER_ERROR
    );
  }

  errorRes.send(res);
};
