import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import passport from "passport";

import { validationResultsMiddleware } from "../utils";

const router = express.Router();

// Login
router.post(
  "/login",
  [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isLength({ max: 72 })
      .withMessage("Password must be under 72 characters"),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (error, user) => {
      if (error) {
        if (error.status) {
          return next(error);
        } else {
          return next({ status: 500, error });
        }
      }

      req.login(user, (err) => {
        if (!err) {
          res.status(200).json({ status: 200 });
        } else {
          next({ status: 500, error });
        }
      });
    })(req, res, next);
  }
);

// Logout
router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({ status: 200 });
});

export default router;
