import type { IPaymentProvider } from "../../domain/ports/IPaymentProvider.ts";
import type { IPaymentRepository } from "../../domain/ports/IPaymentRepository.ts";

export class SyncFailedPayment {
  private PRepository: IPaymentRepository
  private PProvider: IPaymentProvider
  constructor(PRepository: IPaymentRepository, PProvider: IPaymentProvider) {
    this.PRepository = PRepository
    this.PProvider = PProvider
  }

  async execute(id: string) {
    const payment = await this.PRepository.findById(id)
    if(!payment) throw new Error('El pago no existe')
    if(!payment.getStatus().isFailed()) throw new Error('Solo se pueden sincronizar pagos fallidos')

    const providerstatus = await this.PProvider.getStatus(payment.id)
    if(providerstatus === 'success') {
      payment.processSuccess()
      await this.PRepository.save(payment)
      return payment.getSnapshot()
    }
    if (providerstatus === 'pending') throw new Error('El pago sigue pendiente en el provider')
    return payment.getSnapshot()
  }
}