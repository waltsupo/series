import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware To check if user is authenticated
export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({ status: 401 });
  }
};

// Middleware to check that input validations passed
export const validationResultsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({ status: 400, error: errors.array() });
  }
  next();
};
