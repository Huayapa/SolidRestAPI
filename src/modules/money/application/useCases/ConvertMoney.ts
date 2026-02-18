import type { Currency } from "#currency/domain/Currency.ts";
import type { Money } from "#money/domain/Money.ts";
import type { MoneyConvert } from "#money/domain/services/MoneyConvert.ts";

export class ConvertMoney {
  private readonly moneyConvert: MoneyConvert
  constructor(moneyConvert:MoneyConvert) {
    this.moneyConvert = moneyConvert
  }
  async execute(money: Money, currency: Currency):Promise<Money> {
    return await this.moneyConvert.convert(money, currency)
  }
} 