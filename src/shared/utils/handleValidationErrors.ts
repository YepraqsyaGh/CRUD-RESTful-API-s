import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";
import StatusCode from '../types/StatusCode';

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCode.BAD_REQUEST).json(errors.array());
  }

  next();
};