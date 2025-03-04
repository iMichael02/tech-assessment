import { validate } from '../index';
import { createHealthDeclarationSchema } from '../healthDeclaration.schema';
import { Request, Response, NextFunction } from 'express';

jest.mock('@/utils/catchAsync', () => ({
  catchAsync: (fn: (req: Request, res: Response, next: NextFunction) => void) =>
    fn,
}));

describe('validate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { body: {}, query: {} };
    res = {};
    next = jest.fn();
  });

  it('should call next without error if validation passes', async () => {
    req.body = {
      name: 'Dimmu Borgir',
      temperature: 39,
      symptoms: ['cough', 'headaches'],
      contactedWithCovid19Suspects: true,
    };
    const middleware = validate(createHealthDeclarationSchema);

    await middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with an error if validation fails (missing "name" field)', async () => {
    req.body = {
      temperature: 39,
      symptoms: ['cough', 'headaches'],
      contactedWithCovid19Suspects: true,
    };
    const middleware = validate(createHealthDeclarationSchema);

    await middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should call next with an error if validation fails (invalid temperature)', async () => {
    req.body = {
      name: 'Dimmu Borgir',
      temperature: -1,
      symptoms: ['cough', 'headaches'],
      contactedWithCovid19Suspects: true,
    };
    const middleware = validate(createHealthDeclarationSchema);

    await middleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
