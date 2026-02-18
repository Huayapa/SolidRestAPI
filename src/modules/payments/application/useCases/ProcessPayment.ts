import { Currency } from "#currency/domain/Currency.ts"
import type { AllowedCurrency } from "#currency/domain/CurrencyTypes.ts"
import { Money } from "#money/domain/Money.ts"
import { Payment } from "#payments/domain/entities/Payment.ts"
import { PaymentAlReadyExistsError } from "#payments/domain/errors/PaymentAlReadyExistsError.ts"
import type { IPaymentProvider } from "#payments/domain/ports/IPaymentProvider.ts"
import type { IPaymentRepository } from "#payments/domain/ports/IPaymentRepository.ts"
import { PaymentStatus } from "#payments/domain/valueObjects/PaymentStatus.ts"

export class ProcessPayment {
  private PRepository: IPaymentRepository
  private PProvider: IPaymentProvider

  constructor(PRepository:IPaymentRepository, PProvider:IPaymentProvider){
    this.PRepository = PRepository
    this.PProvider = PProvider
  }

  async execute(id: string, amount: number, currency: AllowedCurrency) {
    const exists = await this.PRepository.findById(id)
    if(exists) throw new PaymentAlReadyExistsError(id)
    
    const money: Money = new Money(amount, new Currency(currency))
    const status: PaymentStatus = PaymentStatus.createPending()
    const payment: Payment = new Payment(id, money, status)
    

    try {
      const isSuccess: boolean = await this.PProvider.process(money)
      isSuccess ? payment.processSuccess() : payment.processFail()
    } catch (error) {
      payment.processFail()
    }
    
    await this.PRepository.save(payment)
    return payment.getSnapshot()
  }
}