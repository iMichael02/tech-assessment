import { ApiResponse } from '../ApiResponse';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

describe('ApiResponse', () => {
  it('should create an ApiResponse instance', () => {
    const response = new ApiResponse(StatusCodes.OK, 'OK');
    expect(response).toBeInstanceOf(ApiResponse);
  });

  it('should call send method', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const response = new ApiResponse(StatusCodes.OK, 'OK');
    response.send(res as unknown as Response);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith('OK');
  });
});
