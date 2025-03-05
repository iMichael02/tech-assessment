import { errorHandler } from '../errorHandler';
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { messages } from '@/constants/paths';
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

describe('errorHandler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    res = {
      status: statusMock,
      json: jsonMock,
    } as Partial<Response>;
    req = {};
    next = jest.fn();
  });

  it('should handle Joi validation error', async () => {
    const joiError = Joi.object({ name: Joi.string().required() }).validate(
      {}
    ).error;

    await errorHandler(joiError, req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining(['"name" is required'])
    );
  });

  it('should handle Prisma known request errors', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      {
        code: 'P2002',
        clientVersion: '4.0.0',
      }
    );

    await errorHandler(prismaError, req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(jsonMock).toHaveBeenCalledWith('Unique constraint failed');
  });

  it('should handle Prisma known request errors with unlisted error codes', async () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError(
      'Internal Server Error',
      {
        code: 'P2010',
        clientVersion: '4.0.0',
      }
    );

    await errorHandler(prismaError, req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith('Internal Server Error');
  });

  it('should handle unknown errors with internal server error', async () => {
    const unknownError = new Error('Unexpected error');
    await errorHandler(unknownError, req as Request, res as Response, next);
    expect(statusMock).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith(messages.INTERNAL_SERVER_ERROR);
  });
});
