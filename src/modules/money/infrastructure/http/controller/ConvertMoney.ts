import type { Request, Response } from "express";

import { Money } from "#money/domain/Money.ts";
import { MakeConvertMoney } from "#money/infrastructure/factories/MakeConvertMoney.ts";
import type { AllowedCurrency } from "#currency/domain/CurrencyTypes.ts";
import { Currency } from "#currency/domain/Currency.ts";

export class ConvertMoneyController {
  static async run(req: Request, res: Response) {
    try {
      const {amount, fromCurrency, toCurrency} = req.params
      if (!amount || !fromCurrency || !toCurrency) {
        return res.status(400).json({
          error: 'Campos fisicos requeridos: amount, fromCurrency, toCurrency'
        })
      }

      if (Array.isArray(amount) ) return res.status(400).json({error: 'El valor de amount es incorrecto.'})

      const parsedAmount = parseFloat(amount)
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          error: 'Invalid amount: must be a positive number'
        })
      }
      const convertMoney = MakeConvertMoney()
      const money = new Money(parsedAmount, new Currency(fromCurrency as AllowedCurrency))
      const targetCurrency = new Currency(toCurrency as AllowedCurrency)

      const result = await convertMoney.execute(money, targetCurrency)
      res.status(200).json({
        original: {
          amount: money.amount,
          currency: money.getCurrencyValue()
        },
        converted: {
          amount: result.amount,
          currency: result.getCurrencyValue()
        }
      })
    } catch (error: any) {
      res.status(400).json({error: error.message}) 
    }
  } 
}