import { PaymentNotFoundError } from "../../domain/errors/PaymentNotFoundError.ts"
import type { IPaymentProvider } from "../../domain/ports/IPaymentProvider.ts"
import type { IPaymentRepository } from "../../domain/ports/IPaymentRepository.ts"

export class RetryFailedPayment {
  private PRepository: IPaymentRepository
  private PProvider: IPaymentProvider
  constructor(PRepository: IPaymentRepository, PProvider: IPaymentProvider) {
      this.PRepository = PRepository
      this.PProvider = PProvider
  }

  async execute(id: string) {
    const payment = await this.PRepository.findById(id)
    if(!payment) throw new PaymentNotFoundError(id)
    payment.retry()
    const result = await this.PProvider.process(payment.getMoney())
    if(result) {
      payment.processSuccess()
    } else {
      payment.processFail()
    }
    await this.PRepository.save(payment)
    return payment.getSnapshot()
  }
}