import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../../domaine/services/logger';

// Middleware to validate request parameters
export const validateRequestParams = (req: Request, res: Response, next: NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  logger.debug(req.body)
  next();
};

