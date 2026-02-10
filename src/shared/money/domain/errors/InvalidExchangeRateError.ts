import { DomainError } from "../../../errors/DomainError.ts";

export class InvalidExchangeRateError extends DomainError {
  readonly code:string = 'INVALID_EXCHANGE_RATE_ERROR'
  constructor(rate: number) {
    super(`Coversión de cambio invalido: ${rate}, el cambio debe ser positivo`)
  }
}