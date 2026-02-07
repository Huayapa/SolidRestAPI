import { Currency, type AllowedCurrency } from "../../../../shared/domain/valueObjects/Currency.ts";
import { Money } from "../../../../shared/domain/valueObjects/Money.ts";
import { Payment } from "../../domain/entities/Payment.ts";
import type { IPaymentRepository } from "../../domain/ports/IPaymentRepository.ts";
import type { IPaymentProvider } from "../../domain/ports/IPaymentProvider.ts";
import { PaymentStatus} from "../../domain/valueObjects/PaymentStatus.ts";

export class ProcessPayment {
  private PRepository: IPaymentRepository
  private PProvider: IPaymentProvider

  constructor(PRepository:IPaymentRepository, PProvider:IPaymentProvider){
    this.PRepository = PRepository
    this.PProvider = PProvider
  }

  async execute(id: string, amount: number, currency: AllowedCurrency) {
    const exists = await this.PRepository.findById(id)
    if(exists) throw new Error('El pago ya existe')
    
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