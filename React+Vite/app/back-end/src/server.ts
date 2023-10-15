// @Author David Bishop

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import cors from "cors";

import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();
dotenv.config();

const PORT = Number(process.env.HOST) || 4000,
  baseUrl = "/api";

// **Middleware**
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS is used when the frontend and backend are hosted on different domains. If both your
// front-end and back-end are on the same domain, CORS is unnecessary.
// app.use(
//   cors({
//     origin: [""],
//     credentials: true,
//   })
// );

// *Security*
app.use(helmet()); // Protects various HTTP headers that can help defend against common web hacks.
app.use(hpp()); // Protects against HTTP Parameter Pollution attacks.

// Rate-limiting - used to limit repeated requests.
app.use((req, res, next) => {
  rateLimit({
    windowMs: 60 * 60 * 1000, // 60 Minutes
    max: 55, // limit each IP to 55 requests per windowMs.
    message:
      "Too many requests made from this IP, please try again after an hour.",
  })(req, res, next);
});

// Request logger.
morgan.token("all-headers", (req) => {
  return JSON.stringify(req.headers, null, 2);
});
app.use(
  morgan(":method :url :status :response-time ms \n headers: :all-headers")
);

// *Custom*
// app.use(someCustomMiddleware);

// *Router*
// app.use(`${baseUrl}/auth`, someRouter);
// app.use(`${baseUrl}/csrf`, someRouter);

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello from the back-end!" });
});

app.listen(PORT, "localhost", () =>
  console.log(
    `Server is running on ${process.env.PROTOCOL}${process.env.HOST}:${PORT}; Ctrl-C to terminate...`
  )
);
