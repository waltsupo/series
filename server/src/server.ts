import express, { Request, Response } from "express";
import helmet from "helmet";

// Load env variables from .env-files only if not in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

// Basic security headers
app.use(helmet());

// Routing
const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  res.send("Hello, world");
});

app.use(router);

app.listen(3000);
