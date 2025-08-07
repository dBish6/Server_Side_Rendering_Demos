/**
 * SSR Demo: Vite-Definitive (back-end)
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

import { initSsr, handleSsr } from "./ssr";

// import errorHandler from "@middleware/errorHandler";

import authRouter from "@authFeat/routes/authRoute";

const { PROTOCOL, HOST, PORT: ENV_PORT } = process.env,
  PORT = Number(ENV_PORT) || 4000; // 4000 is not in the env.

async function setupServer() {
  const app = express(),
    baseUrl = "/api";

  app.disable("x-powered-by");

  const vite = await initSsr(app); // Server side rendering middleware for React front-end.

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
      // Allows Vite to inject scripts in development (e.g., for React Fast Refresh).
      contentSecurityPolicy: process.env.NODE_ENV === "development" ? false : true
    })
  );
  app.use(hpp()); // Protects against HTTP Parameter Pollution attacks.
  // Rate-limiting; used to limit repeated requests.
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000, // 60 minutes.
      max: 55, // limits each IP to 55 requests per windowMs.
      handler: (_: express.Request, res: express.Response) => 
        res.status(429).json({
          status: 429,
          ERROR: "Too many requests made from this IP, please try again after an hour."
        }),
      skip: (req) => {
        if (process.env.NODE_ENV === "development")
          return [
            /^\/@vite\//,
            /^\/src\//,
            /^\/@react-refresh/,
            /\.css$/,
            /\.js$/,
            /\.map$/
          ].some((pattern) => pattern.test(req.url));

        return false;
      }
    })
  );

  // *Logger Middleware*
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  
  // *Routers*
  app.use(`${baseUrl}/auth`, authRouter);

  app.get(`${baseUrl}/`, async (_, res) => {
    res.json({ message: "Building-U api online!" });
  });

  handleSsr(app, vite); // Handler(s) for SSR. Placed after the api routes to avoid 'clobbering' those endpoints.

  // *Error Handling Middleware*
  // app.use(errorHandler);

  return app;
}

setupServer().then((app) =>
  app.listen(PORT, HOST!, () =>
    console.log(
      `Server is running on ${PROTOCOL}${HOST}:${PORT}; Ctrl-C to terminate...`
    )
  )
);
