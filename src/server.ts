
import express from "express"
import type { Express } from 'express';
import { paymentRoutes } from "./modules/payments/infrastructure/http/routes/routes.ts"
import { moneyRoutes } from "./shared/money/infrastructure/http/routes/routes.ts";


export function startServer():Express {
  const app: Express = express()

  app.use(express.json())
  app.disable('x-powered-by')

  app.use('/payments', paymentRoutes)
  app.use('/money', moneyRoutes)
  return app
}