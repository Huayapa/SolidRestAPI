import { DomainError } from "#shared/domain/errors/DomainError.ts"

export class InvalidExchangeRateError extends DomainError {
  readonly code:string = 'INVALID_EXCHANGE_RATE'
  constructor(rate: number) {
    super(`Coversión de cambio invalido: ${rate}, el cambio debe ser positivo`)
  }
}