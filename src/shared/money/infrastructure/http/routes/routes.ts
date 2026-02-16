import express, { Router } from "express";
import { ConvertMoneyController } from "../controller/ConvertMoney.ts";

export const moneyRoutes:Router = express.Router()

moneyRoutes.get('/convert/:from/:to', ConvertMoneyController.run)