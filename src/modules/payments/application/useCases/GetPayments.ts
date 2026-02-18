import type { IPaymentRepository } from "#payments/domain/ports/IPaymentRepository.ts"


export class GetPayments {
  private PRepository: IPaymentRepository
  constructor (PRepository: IPaymentRepository) {
    this.PRepository = PRepository
  }

  async execute() {
    const payments = await this.PRepository.findAll()
    return payments.map(payment => {
      return payment.getSnapshot()
    })
  }
}