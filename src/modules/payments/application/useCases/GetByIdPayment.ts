import type { IPaymentRepository } from "../../domain/ports/IPaymentRepository.ts";

export class GetByIdPayment {
  private PRepository: IPaymentRepository
  constructor(PRepository: IPaymentRepository) {
    this.PRepository = PRepository
  }

  async execute(id: string) {
    const payment = await this.PRepository.findById(id)
    if (!payment) throw new Error('Payment no encontrado')
    return payment.getSnapshot()
  }
}