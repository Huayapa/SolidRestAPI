import type { NextFunction, Request, Response } from "express";
import { MakeRetryFailedPayment } from "#payments/infrastructure/factories/MakeRetryFailedPayment.ts";
import { HttpError } from "#shared/infrastructure/http/httpError.ts";

export class RetryFailedPaymentController {
  static async run(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params
      if(!id || Array.isArray(id)) throw new HttpError(400, 'ID inválido')
      const usecase = MakeRetryFailedPayment()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error: any) {
      next(error)
    }
  }
}