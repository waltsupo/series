import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// Middleware To check if user is authenticated
export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({ status: 401 });
  }
};

// Middleware to check that input validations passed
export const validationResultsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, error: errors.array() });
  }
  next();
};

// Helper function to fitler empty keys from object
export const filterEmptyValues = (original: { [k: string]: any }): { [k: string]: any } => {
  const filteredKeys: string[] = Object.keys(original).filter((key: string) => !!original[key]);

  const newObject: { [key: string]: any } = {};
  filteredKeys.map((key) => (newObject[key] = original[key]));
  return newObject;
};
