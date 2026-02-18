import type { Currency } from "#currency/domain/Currency.ts"
import type { AllowedCurrency } from "#currency/domain/CurrencyTypes.ts"
import { ExchangeRateNotFoundError } from "#money/domain/errors/ExchangeRateNotFoundError.ts"
import type { ExchangeRateRepository } from "#money/domain/ports/ExchangeRateRepository.ts"

interface ExchangeRateRecord {
  from: AllowedCurrency,
  to: AllowedCurrency,
  rate: number
}
export class MemoryExchangeRateRepository implements ExchangeRateRepository {
  private readonly rates: ExchangeRateRecord[]
  constructor() {
    this.rates = [
      { from: 'USD', to: 'PEN', rate: 3.73 },
      { from: 'PEN', to: 'USD', rate: 0.27 },
      { from: 'USD', to: 'EUR', rate: 0.92 },
      { from: 'EUR', to: 'USD', rate: 1.09 },
      { from: 'EUR', to: 'PEN', rate: 4.06 },
      { from: 'PEN', to: 'EUR', rate: 0.25 }
    ]
  }
  async getRate(from: Currency, to: Currency): Promise<number> {
    if(from.equals(to)) return 1
    const rate = this.rates.find(r => r.from === from.getValue() && r.to === to.getValue())?.rate
    if(rate === undefined) throw new ExchangeRateNotFoundError(from, to)
    return rate
  }
}