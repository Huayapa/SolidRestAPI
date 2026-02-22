import { MakeCancelProcessPayment } from "#payments/infrastructure/factories/MakeCancelProcessPayment.ts";
import { HttpError } from "#shared/infrastructure/http/httpError.ts";
import type { NextFunction, Request, Response } from "express";


export class CancelPaymentController {
  static async run(req: Request, res: Response, next: NextFunction) {
    try {
      const {id} = req.params 
      if(!id || Array.isArray(id)) throw new HttpError(400, 'ID inválido')
      const usecase = MakeCancelProcessPayment()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error: any) {
      next(error)
    }
  }
}