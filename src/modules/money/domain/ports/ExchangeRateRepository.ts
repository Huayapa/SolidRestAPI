import type { Currency } from "../../../../modules/currency/domain/Currency.ts";

export interface ExchangeRateRepository {
  getRate(from: Currency, to: Currency): Promise<number>
}