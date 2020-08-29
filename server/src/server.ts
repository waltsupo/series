import express, { Request, Response } from "express";
import helmet from "helmet";

import { userRouter } from "./routes";

const app = express();

// Basic security headers
app.use(helmet());

// Routing
app.use("/users", userRouter);

app.listen(3000);
