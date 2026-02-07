import type { Request, Response } from "express"
import { MakeGetByIdPayments } from "../../factories/MakeGetByIdPayment.ts"

export class GetByIdPaymentController {
  static async run(req: Request, res: Response) {
    try {
      const {id} = req.params
      if(!id || Array.isArray(id)) return res.status(400).json({ error: 'ID inválido' })
      const usecase = MakeGetByIdPayments()
      const result = await usecase.execute(id)
      res.status(200).json(result)
    } catch (error:any) {
      res.status(400).json({error: error.message})
    }
  }
}