import express, { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';

import db from '../database';
import { authenticationMiddleware, validationResultsMiddleware } from '../utils';

const router = express.Router();

// Get user
router.get(
  '/:id',
  [
    authenticationMiddleware,
    check('id').isInt().withMessage('Id is not a number'),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const user = await db.User.findOne({ where: { id } });

      if (!user) {
        return next({ status: 404, error: 'User not found' });
      }

      res.status(200).json({ status: 200, data: user });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Create user
router.post(
  '/',
  [
    check('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .isLength({ max: 72 })
      .withMessage('Password must be 72 or less characters'),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({ username, password: hashedPassword });
      res.status(200).json({ status: 201, data: user });
    } catch (error) {
      // If username is taken
      if (error.name === 'SequelizeUniqueConstraintError') {
        next({ status: 400, error: 'Username not unique' });
      }
      next({ status: 500, error });
    }
  }
);

export default router;
