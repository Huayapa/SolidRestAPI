import type { AllowedCurrency } from "./CurrencyTypes.ts"
import { InvalidCurrencyError } from "./InvalidCurrencyError.ts"


export class Currency {
  private static readonly allowed: AllowedCurrency[] = ['USD', 'PE', 'MX']
  public readonly value:AllowedCurrency

  constructor(value:AllowedCurrency) {
    if(!Currency.allowed.includes(value)) {
      throw new InvalidCurrencyError(value, Currency.allowed)
    }
    this.value = value
  }

  public equals(otherCurrency: Currency):boolean {
    return this.value === otherCurrency.value
  }

  public getValue(): AllowedCurrency {
    return this.value
  }
}