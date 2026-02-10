import  { Currency } from "../../currency/domain/Currency.ts"
import type { AllowedCurrency } from "../../currency/domain/CurrencyTypes.ts"
import { InvalidAmountMoneyError } from "./errors/InvalidAmountMoneyError.ts"
import { InvalidOpeationMoneyError } from "./errors/InvalidOperationMoneyError.ts"

export class Money {
  public readonly amount: number
  public readonly currency: Currency
  constructor(amount: number, currency: Currency) {
    if(amount < 0) throw new InvalidAmountMoneyError()
    this.amount = amount
    this.currency = currency
  }


  public add(otherMoney:Money) {
    if(!this.currency.equals(otherMoney.currency)) throw new InvalidOpeationMoneyError('sumar')
    return new Money(this.amount + otherMoney.amount, this.currency)
  }
  
  public substract(otherMoney:Money) {
    if(!this.currency.equals(otherMoney.currency)) throw new InvalidOpeationMoneyError('restar')
    return new Money(this.amount - otherMoney.amount, this.currency)
  }


  public convert(targetCurrency: Currency, rate: number) {
    return new Money(this.amount * rate, targetCurrency)
  }

  public isGreaterThan(otherMoney: Money) {
    if (!this.currency.equals(otherMoney.currency)) {
      throw new InvalidOpeationMoneyError('comparar')
    }
    return this.amount > otherMoney.amount
  }

  public getCurrencyValue(): AllowedCurrency {
    return this.currency.getValue()
  }

}