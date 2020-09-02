import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

import db from "../database";
import { validationResultsMiddleware } from "../utils";

const router = express.Router();

// Create episode
router.post(
  "/",
  [
    check("title").isString(),
    check("episodeNumber").isNumeric(),
    check("type").isIn(["episode", "special", "movie"]),
    check("link").isString(),
    check("published").optional().isNumeric(),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, episodeNumber, type, link, published } = req.body;

    try {
      const episode = await db.Episode.create({
        title,
        episodeNumber,
        type,
        link,
        published,
      });
      res.status(200).json({ status: 201, data: episode });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

export default router;
