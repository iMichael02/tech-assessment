import { catchAsync } from '../catchAsync';
import { NextFunction, Request, Response } from 'express';

describe('catchAsync', () => {
  it('should execute fn', async () => {
    const fn = jest.fn();
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;
    const middleware = catchAsync(fn);
    await middleware(req, res, next);
    expect(fn).toHaveBeenCalledWith(req, res, next);
  });

  it('should catch and execute fn with error', async () => {
    const fn = () => {
      throw Error('error');
    };
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const middleware = catchAsync(fn);
    await middleware(req, res, next);
    expect(fn).toThrow(Error);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
