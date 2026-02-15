import { ConvertMoney } from "../../application/useCases/ConvertMoney.ts";
import { MoneyConvert } from "../../domain/services/MoneyConvert.ts";
import { MoneyRepositoryFactory } from "../persistence/MoneyRepositoryFactory.ts";

export function MakeConvertMoney() {
  const exchangeRateRepository  = MoneyRepositoryFactory.create()
  const moneyConvert = new MoneyConvert(exchangeRateRepository)
  return new ConvertMoney(moneyConvert)
}