import type { NextFunction, Request, Response } from "express";
import { MakeGetPayments } from "#payments/infrastructure/factories/MakeGetPayments.ts";

export class GetPaymentsController {
  static async run(req:Request, res:Response, next: NextFunction) {
    try {
      const useCase = MakeGetPayments()
      const result = await useCase.execute()
      res.status(200).json(result)
    } catch (error:any){
      next(error)
    }
  }
}