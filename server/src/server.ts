import express, { Request, Response } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

import { userRouter } from "./routes";

const app = express();

// Basic security headers
app.use(helmet());

app.use(bodyParser.json());

// Routing
app.use("/users", userRouter);

app.listen(3000);
