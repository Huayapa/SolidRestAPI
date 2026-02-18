import { DomainError } from "#shared/errors/DomainError.ts";

export class ProviderPaymentStillPendingError extends DomainError {
  readonly code: string = 'PROVIDER_PAYMENT_STILL_PENDING'
  constructor() {
    super('El pago sigue pendiente en el proveedor')
  }
}