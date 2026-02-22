import type { NextFunction, Request, Response } from "express"
import { MakeProcessPayment } from "#payments/infrastructure/factories/MakeProcessPayment.ts"
import { Currency } from "#currency/domain/Currency.ts"
import type { AllowedCurrency } from "#currency/domain/CurrencyTypes.ts"
import { HttpError } from "#shared/infrastructure/http/httpError.ts"

export class ProcessPaymentController {
  static async run(req:Request, res:Response, next: NextFunction) {
    try {
      const { id, amount, currency } = req.body
      if(!id || !amount || !currency) throw new HttpError(400, 'Se necesita los campos id, amount y currency.')
      const paymentCurrency = new Currency(currency as AllowedCurrency)
      const useCase = MakeProcessPayment()
      const result = await useCase.execute(id, amount, paymentCurrency.value)
      res.status(201).json(result)
    } catch (error:any){
      next(error)
    }
  }
}