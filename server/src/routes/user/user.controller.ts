import { Request, Response } from "express";

/** Endpoint to get user information */
export const getUser = async (req: Request, res: Response) => {
  res.status(200).json({ status: 200 });
};
