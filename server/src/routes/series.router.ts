import express, { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';

import db from '../database';
import { validationResultsMiddleware, filterEmptyValues } from '../utils';

const router = express.Router();

// Get all series
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const series = await db.Series.findAll();
    res.status(200).json({ status: 200, data: series });
  } catch (error) {
    next({ status: 500, error });
  }
});

// Get single series
router.get(
  '/:id',
  [check('id').isNumeric(), validationResultsMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const series = await db.Series.findOne({ where: { id } });
      res.status(200).json({ status: 200, data: series });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Get all episodes for a series
router.get(
  '/:id/episodes',
  [check('id').isNumeric(), validationResultsMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const episodes = await db.Episode.findAll({ where: { seriesId: id } });
      res.status(200).json({ status: 200, data: episodes });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Create series
router.post(
  '/',
  [
    check('name').isString(),
    check('altNames').optional().isString(),
    check('status').isIn(['ongoing', 'finished', 'upcoming']),
    check('description').optional().isString(),
    check('genres').optional().isString(),
    check('coverImg').optional().isString(),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, altNames, status, description, genres, coverImg } = req.body;

    try {
      const series = await db.Series.create({
        name,
        altNames,
        status,
        description,
        genres,
        coverImg,
      });
      res.status(201).json({ status: 201, data: series });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Update series
router.patch(
  '/:id',
  [
    check('id').isNumeric(),
    check('name').optional().isString(),
    check('altNames').optional().isString(),
    check('status').optional().isIn(['ongoing', 'finished', 'upcoming']),
    check('description').optional().isString(),
    check('genres').optional().isString(),
    check('coverImg').optional().isString(),
    validationResultsMiddleware,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name, altNames, status, description, genres, coverImg } = req.body;
    const filteredValues = filterEmptyValues({
      name,
      altNames,
      status,
      description,
      genres,
      coverImg,
    });

    if (Object.keys(filteredValues).length === 0) {
      return next({ status: 400, error: 'No fields updated' });
    }

    try {
      const [_, updated] = await db.Series.update(filteredValues, {
        where: { id },
        returning: true,
      });

      res.status(200).json({ status: 200, data: updated });
    } catch (error) {
      next({ status: 500, error });
    }
  }
);

// Delete series
router.delete(
  '/:id',
  [check('id').isNumeric(), validationResultsMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const rowsAffected = await db.Series.destroy({ where: { id } });

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
