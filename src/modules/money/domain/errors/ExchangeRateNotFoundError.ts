import type { Currency } from "../../../../modules/currency/domain/Currency.ts";
import { DomainError } from "../../../../shared/errors/DomainError.ts";


export class ExchangeRateNotFoundError extends DomainError {
  readonly code:string = 'ENCHANGE_RATE_NOT_FOUND'
  constructor(from: Currency, to:Currency) {
    super(`No se encontro la tasa de cambio: ${from.getValue()} - ${to.getValue()}`)
  }
}