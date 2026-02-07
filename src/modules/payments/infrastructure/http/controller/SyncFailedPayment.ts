import type { Request, Response } from "express";
import { MakeSyncFailedPayment } from "../../factories/MakeSyncFailedPayment.ts";

export class SyncFailedPaymentController {
  static async run(req:Request, res:Response) {
    try {
      const {id} = req.params
      if(!id || Array.isArray(id)) return res.status(400).json({ error: 'ID inválido' })
      const usecase = MakeSyncFailedPayment()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error:any) {
      res.status(400).json({error: error.message})
    }
  }
}