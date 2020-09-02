import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";

import db from "../database";
import { validationResultsMiddleware, filterEmptyValues } from "../utils";

const router = express.Router();

// Get 5 latest episodes
router.get(
  "/latest",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const episodes = await db.Episode.findAll({
        limit: 5,
        order: [["published", "DESC"]],
      });
      res.status(200).json({ status: 200, data: episodes });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

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
      res.status(201).json({ status: 201, data: episode });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// update episode
router.patch(
  "/:id",
  [
    check("id").isNumeric(),
    check("title").optional().isString(),
    check("episodeNumber").optional().isNumeric(),
    check("type").optional().isIn(["episode", "special", "movie"]),
    check("link").optional().isString(),
    check("published").optional().isNumeric(),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, episodeNumber, type, link, published } = req.body;
    const filteredValues = filterEmptyValues({
      title,
      episodeNumber,
      type,
      link,
      published,
    });

    if (Object.keys(filteredValues).length === 0) {
      return next({ status: 400, error: "No fields updated" });
    }

    try {
      const [_, updated] = await db.Episode.update(filteredValues, {
        where: { id },
        returning: true,
      });

      res.status(200).json({ status: 200, data: updated });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Delete episode
router.delete(
  "/:id",
  [check("id").isNumeric(), validationResultsMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const rowsAffected = await db.Episode.destroy({ where: { id } });

      if (rowsAffected === 0) {
        return next({ status: 404 });
      }

      res.status(200).json({ status: 200 });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

export default router;
