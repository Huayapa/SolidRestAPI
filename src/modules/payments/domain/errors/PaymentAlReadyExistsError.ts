import { DomainError } from "../../../../shared/errors/DomainError.ts";

export class PaymentAlReadyExistsError extends DomainError {
  readonly code:string = 'PAYMENT_AL_READY_EXISTS'
  constructor(id:string) {
    super(`Este pago ${id} ya existe`)
  }
}