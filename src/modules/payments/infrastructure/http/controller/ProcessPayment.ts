import type { Request, Response } from "express"
import { MakeProcessPayment } from "../../factories/MakeProcessPayment.ts"
import { Currency, type AllowedCurrency } from "../../../../../shared/domain/valueObjects/Currency.ts"

export class ProcessPaymentController {
  static async run(req:Request, res:Response) {
    try {
      const { id, amount, currency } = req.body
      if(!id || !amount || !currency) throw new Error('Se necesita los campos id, amount y currency.')
      const paymentCurrency = new Currency(currency as AllowedCurrency)
      const useCase = MakeProcessPayment()
      const result = await useCase.execute(id, amount, paymentCurrency.value)
      res.status(201).json(result)
    } catch (error:any){
      res.status(400).json({error: error.message})
    }
  }
}