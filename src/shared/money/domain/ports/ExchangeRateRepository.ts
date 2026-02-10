import type { Currency } from "../../../currency/domain/Currency.ts";

export interface ExchangeRateRepository {
  getRate(from: Currency, to: Currency): Promise<number>
}