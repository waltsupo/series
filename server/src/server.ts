import express, { Request, Response } from "express";

// Load env variables from .env-files only if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  res.send("Hello, world");
});

app.use(router);

app.listen(process.env.PORT || 3000);
