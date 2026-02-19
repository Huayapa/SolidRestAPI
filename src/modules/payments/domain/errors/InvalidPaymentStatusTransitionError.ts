import { DomainError } from "#shared/domain/errors/DomainError.ts"

export class InvalidPaymentStatusTransitionError extends DomainError {
  readonly code:string = 'INVALID_PAYMENT_STATUS_TRANSITION'
  constructor(from: string, to: string) {
    super(`No se puede cambiar el estado de ${from} a ${to}`)
  }
}