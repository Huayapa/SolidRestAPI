import type { Currency } from "#currency/domain/Currency.ts";
import { InvalidExchangeRateError } from "#money/domain/errors/InvalidExchangeRateError.ts";
import { Money } from "#money/domain/Money.ts";
import type { ExchangeRateRepository } from "#money/domain/ports/ExchangeRateRepository.ts";

export class MoneyConvert {
  private readonly exchangeRateRepository: ExchangeRateRepository
  constructor(exchangeRateRepository: ExchangeRateRepository) {
    this.exchangeRateRepository = exchangeRateRepository
  }

  async convert(money: Money, currency: Currency):Promise<Money> {
    if(money.currency.equals(currency)) return money
    const rate = await this.exchangeRateRepository.getRate(money.currency, currency)
    if(rate <= 0) throw new InvalidExchangeRateError(rate)
    return new Money(money.amount * rate, currency)
  }
}