import express, { Router } from "express";
import { ConvertMoneyController } from "#money/infrastructure/http/controller/ConvertMoney.ts";

export const moneyRoutes:Router = express.Router()

moneyRoutes.get('/convert/:from/:to', ConvertMoneyController.run)