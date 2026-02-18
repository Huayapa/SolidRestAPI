import { ConvertMoney } from "#money/application/useCases/ConvertMoney.ts";
import { MoneyConvert } from "#money/domain/services/MoneyConvert.ts";
import { MoneyRepositoryFactory } from "#money/infrastructure/persistence/MoneyRepositoryFactory.ts";

export function MakeConvertMoney() {
  const exchangeRateRepository  = MoneyRepositoryFactory.create()
  const moneyConvert = new MoneyConvert(exchangeRateRepository)
  return new ConvertMoney(moneyConvert)
}