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
    if(this.value !== 'pending') throw new Error('Solo se pueden completar pagos pendientes')
    return new PaymentStatus('completed')
  }

  public fail(): PaymentStatus {
    if(this.value !== 'pending') throw new Error('Solo se pueden fallar pagos pendientes')
    return new PaymentStatus('failed')
  }

  public cancel(): PaymentStatus {
    if(this.value !== 'pending') throw new Error('Solo se pueden cancelar pagos pendientes')
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