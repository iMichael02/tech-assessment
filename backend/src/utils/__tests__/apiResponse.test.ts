import { APIResponse } from '../ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

describe('APIResponse', () => {
  it('should create an APIResponse instance', () => {
    const response = new APIResponse(StatusCodes.OK, 'OK');
    expect(response).toBeInstanceOf(APIResponse);
  });

  it('should call send method', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const response = new APIResponse(StatusCodes.OK, 'OK');
    response.send(res as unknown as Response);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith('OK');
  });
});
