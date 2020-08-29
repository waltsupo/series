import express, { Request, Response } from "express";

import { getUser } from "./user.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  getUser(req, res);
});

export default router;
