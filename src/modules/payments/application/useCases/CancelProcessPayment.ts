import type { IPaymentProvider } from "../../domain/ports/IPaymentProvider.ts";
import type { IPaymentRepository } from "../../domain/ports/IPaymentRepository.ts";

export class CancelProcessPayment {
  private PRepository: IPaymentRepository
  private PProvider: IPaymentProvider
  constructor(PRepository:IPaymentRepository, PProvider:IPaymentProvider) {
    this.PRepository = PRepository
    this.PProvider = PProvider
  }

  async execute(id: string) {
    const payment = await this.PRepository.findById(id)
    if(!payment) throw new Error('El pago no existe')
    if(!payment.getStatus().isPending()) throw new Error('Solo se cancela un pago cuando esta en pendiente')
    this.PProvider.cancel(payment.id)
    payment.processCancel()
    await this.PRepository.save(payment)
    return payment.getSnapshot()
  }
}