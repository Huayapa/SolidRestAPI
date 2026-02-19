import { DomainError } from "#shared/domain/errors/DomainError.ts"

export class PaymentNotFoundError extends DomainError {
  readonly code:string = 'PAYMENT_NOT_FOUND'
  constructor(id: string) {
    super(`Pago ${id} no encontrado.`)
  }
}