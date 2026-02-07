import express from "express"
import type { Router } from 'express';
import { ProcessPaymentController } from "../controller/ProcessPayment.ts";
import { GetPaymentsController } from "../controller/GetPayments.ts";
import { GetByIdPaymentController } from "../controller/GetByIdPayment.ts";
import { SyncFailedPaymentController } from "../controller/SyncFailedPayment.ts";
import { RetryFailedPaymentController } from "../controller/RetryFailedPayment.ts";

export const paymentRoutes:Router = express.Router();

paymentRoutes.post('/', ProcessPaymentController.run)
paymentRoutes.get('/', GetPaymentsController.run)
paymentRoutes.get('/:id', GetByIdPaymentController.run)
paymentRoutes.post('/:id/sync', SyncFailedPaymentController.run)
paymentRoutes.post('/:id/retry', RetryFailedPaymentController.run)
