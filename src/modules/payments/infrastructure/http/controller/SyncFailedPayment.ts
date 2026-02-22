import type { NextFunction, Request, Response } from "express";
import { MakeSyncFailedPayment } from "#payments/infrastructure/factories/MakeSyncFailedPayment.ts";
import { HttpError } from "#shared/infrastructure/http/httpError.ts";

export class SyncFailedPaymentController {
  static async run(req:Request, res:Response, next:NextFunction) {
    try {
      const {id} = req.params
      if(!id || Array.isArray(id)) throw new HttpError(400, 'ID inválido')
      const usecase = MakeSyncFailedPayment()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error:any) {
      next(error)
    }
  }
}