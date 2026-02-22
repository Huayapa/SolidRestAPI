
import express from "express"
import type { Express } from 'express';
import { paymentRoutes } from "#payments/infrastructure/http/routes/routes.ts"
import { moneyRoutes } from "#money/infrastructure/http/routes/routes.ts";
import { errorHandler } from "#shared/infrastructure/http/errorHandler.ts";


export function startServer():Express {
  const app: Express = express()

  app.use(express.json())
  app.disable('x-powered-by')

  app.use('/payments', paymentRoutes)
  app.use('/money', moneyRoutes)

  app.use(errorHandler)
  return app
}