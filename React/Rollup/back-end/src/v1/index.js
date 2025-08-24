/**
 * SSR Demo: Rollup + React (back-end)
 * 
 * Author: David Bishop
 */

import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import authRouter from "./routes/authRoute";

const { PROTOCOL, HOST, PORT: ENV_PORT } = process.env,
  PORT = Number(ENV_PORT) || 3000;

async function setupServer() {
  const app = express(),
    baseUrl = "/api/v1";

  app.disable("x-powered-by");

  // *Parser Middleware*
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser()); 

  // *Security Middleware*
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true
    })
  );
  // Sets various HTTP headers that can help defend against common web hacks.
  app.use(
    helmet({
      xPoweredBy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://unpkg.com"]
        }
      }
    })
  );
  app.use(hpp()); // Protects against HTTP Parameter Pollution attacks.
  // Rate-limiting; used to limit repeated requests.
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000, // 60 Minutes
      max: 55, // limits each IP to 55 requests per windowMs.
      handler: (_, res) => 
        res.status(429).json({
          status: 429,
          ERROR: "Too many requests made from this IP, please try again after an hour."
        })
    })
  );

  // *Logger Middleware*
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // *Routers*
  app.use(`${baseUrl}/auth`, authRouter);

  // Test entry route.
  app.get(`${baseUrl}/`, async (_, res) => {
    res.json({ message: "Rollup api online!" });
  });

  if (!process.env.API_DEV) (await import("./ssr")).default(app);

  // *Error Handling Middleware*
  // app.use(errorHandler);

  return app;
};

setupServer().then((app) =>
  app.listen(PORT, HOST, () =>
    console.log(
      `Server is running on ${PROTOCOL}${HOST}:${PORT}; Ctrl-C to terminate...`
    )
  )
);
