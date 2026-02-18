
import type { AllowedCurrency } from "../../../modules/currency/domain/CurrencyTypes.ts";
import { DomainError } from "../../../shared/errors/DomainError.ts";

export class InvalidCurrencyError extends DomainError {
  readonly code: string = 'INVALID_CURRENCY_ERROR'
  constructor(value:string, currencies:AllowedCurrency[]) {
    super(`Divisa invalida: ${value}. Permitidas ${currencies}`)
  }
}