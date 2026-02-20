import { DomainError } from "#shared/domain/errors/DomainError.ts"

export class PaymentAlReadyExistsError extends DomainError {
  readonly code:string = 'PAYMENT_ALREADY_EXISTS'
  constructor(id:string) {
    super(`Este pago ${id} ya existe`)
  }
}