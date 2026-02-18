import { InvalidPaymentStatusTransitionError } from "../errors/InvalidPaymentStatusTransitionError.ts"

export type StatusType = 'pending' | 'completed' | 'failed' | 'cancelled'
export class PaymentStatus {
  public readonly value: StatusType
  constructor(value: StatusType) {
    this.value = value
  }

  static createPending(): PaymentStatus {
    return new PaymentStatus('pending')
  }

  public complete(): PaymentStatus {
    if(this.value !== 'pending') throw new InvalidPaymentStatusTransitionError(this.value, 'pendiente')
    return new PaymentStatus('completed')
  }

  public fail(): PaymentStatus {
    if(this.value !== 'pending') throw new InvalidPaymentStatusTransitionError(this.value, 'pendiente')
    return new PaymentStatus('failed')
  }

  public retry(): PaymentStatus {
    if(this.value !== 'failed') throw new InvalidPaymentStatusTransitionError(this.value, 'pendiente')
    return new PaymentStatus('pending')
  }
  public ensureCanSync(): void {
    if(this.value !== 'failed') throw new InvalidPaymentStatusTransitionError(this.value, 'fallido')
  }

  public cancel(): PaymentStatus {
    if(this.value !== 'pending') throw new InvalidPaymentStatusTransitionError(this.value, 'pendiente')
    return new PaymentStatus('cancelled')
  }

  public isPending():boolean {
    return this.value === 'pending'
  }
  public isComplete():boolean {
    return this.value === 'completed'
  }
  public isFailed():boolean {
    return this.value === 'failed'
  }
  public isCancelled():boolean {
    return this.value === 'cancelled'
  }
  public isFinal():boolean {
    return ['completed', 'failed', 'cancelled'].includes(this.value)
  }
}