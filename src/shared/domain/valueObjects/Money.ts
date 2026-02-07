import type { AllowedCurrency, Currency } from "./Currency.ts"

export class Money {
  public readonly amount: number
  public readonly currency: Currency
  constructor(amount: number, currency: Currency) {
    this.amount = amount
    this.currency = currency
    if(amount < 0) throw new Error('La cantidad no puede ser menor a 0')
  }


  public add(otherMoney:Money) {
    if(!this.currency.equals(otherMoney.currency)) throw new Error('No se pueden sumar monedas de distintas divisas')
    return new Money(this.amount + otherMoney.amount, this.currency)
  }
  
  public substract(otherMoney:Money) {
    if(!this.currency.equals(otherMoney.currency)) throw new Error('No se pueden remover monedas de distintas divisas')
    return new Money(this.amount - otherMoney.amount, this.currency)
  }


  public convert(targetCurrency: Currency, rate: number) {
    return new Money(this.amount * rate, targetCurrency)
  }

  public isGreaterThan(otherMoney: Money) {
    return this.amount >= otherMoney.amount
  }

  public getCurrencyValue(): AllowedCurrency {
    return this.currency.getValue()
  }

}