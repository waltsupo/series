import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import db from "../database";

const router = express.Router();

router.get(
  "/:id",
  [check("id").isInt().withMessage("Id is not a number")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { id } = req.params;

    try {
      const user = await db.User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }
);

router.post(
  "/",
  [
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isLength({ max: 72 })
      .withMessage("Password must be under 72 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({ username, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }
);

export default router;
