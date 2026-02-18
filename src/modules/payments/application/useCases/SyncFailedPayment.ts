import { PaymentNotFoundError } from "../../domain/errors/PaymentNotFoundError.ts";
import { ProviderPaymentStillPendingError } from "../../domain/errors/ProviderPaymentStillPendingError.ts";
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
    if(!payment) throw new PaymentNotFoundError(id)
    payment.sync()
    const providerstatus = await this.PProvider.getStatus(payment.id)
    if(providerstatus === 'success') {
      payment.processSuccess()
      await this.PRepository.save(payment)
    } else if(providerstatus === 'pending') {
      throw new ProviderPaymentStillPendingError()
    }
    return payment.getSnapshot()
  }
}