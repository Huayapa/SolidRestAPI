import type { Money } from "../../../../shared/domain/valueObjects/Money.ts";
import type { IPaymentProvider, ProviderStatus } from "../../domain/ports/IPaymentProvider.ts";

export class PayPalPaymentProvider implements IPaymentProvider {
  async process(money: Money): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  }
  async getStatus(paymentId: string): Promise<ProviderStatus> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'pending'
  }
  async cancel(paymentId: string): Promise<void> {
    await fetch(`Url/apipaypal/${paymentId}/void`, {
      method: 'POST'
    })
  }
}