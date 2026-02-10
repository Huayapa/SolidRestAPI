import { DomainError } from "../../errors/DomainError.ts";
import type { AllowedCurrency } from "./CurrencyTypes.ts";

export class InvalidCurrencyError extends DomainError {
  readonly code: string = 'INVALID_CURRENCY_ERROR'
  constructor(value:string, currencies:AllowedCurrency[]) {
    super(`Divisa invalida: ${value}. Permitidas ${currencies}`)
  }
}