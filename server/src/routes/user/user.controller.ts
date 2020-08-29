import { Request, Response } from "express";
import db from "../../database";

/** Endpoint to get user information */
export const getUser = async (req: Request, res: Response) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
