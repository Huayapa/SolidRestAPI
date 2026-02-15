import express, { Router } from "express";
import { ConverMoneyController } from "../controller/ConvertMoney.ts";

export const moneyRoutes:Router = express.Router()

moneyRoutes.post('/convert/:from/:to', ConverMoneyController.run)