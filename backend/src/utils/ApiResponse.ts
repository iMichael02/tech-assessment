import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class APIResponse {
  constructor(
    public readonly statusCode: StatusCodes,
    public readonly data: string | object
  ) {}

  send(res: Response) {
    return res.status(this.statusCode).json(this.data);
  }
}
