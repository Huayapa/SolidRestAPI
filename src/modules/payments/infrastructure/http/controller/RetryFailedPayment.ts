import type { Request, Response } from "express";
import { MakeRetryFailedPayment } from "../../factories/MakeRetryFailedPayment.ts";

export class RetryFailedPaymentController {
  static async run(req: Request, res: Response) {
    try {
      const {id} = req.params
      if(!id || Array.isArray(id)) return res.status(400).json({ error: 'ID inválido' })
      const usecase = MakeRetryFailedPayment()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(400).json({error: error.message})
    }
  }
}