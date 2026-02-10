import type { Money } from "../../../../shared/money/domain/Money.ts";
export type ProviderStatus = 'pending' | 'success' | 'failed'

export interface IPaymentProvider {
  process(money: Money): Promise<boolean>
  getStatus(paymentId: string): Promise<ProviderStatus>
  cancel(paymentId: string): Promise<void>
}