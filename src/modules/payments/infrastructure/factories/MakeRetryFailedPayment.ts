import { RetryFailedPayment } from "#payments/application/useCases/RetryFailedPayment.ts"
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts"
import { PaymentProviderFactory } from "../providers/PaymentProviderFactory.ts"

export function MakeRetryFailedPayment() {
  const repository = PaymentRepositoryFactory.create()
  const provider = PaymentProviderFactory.create()
  return new RetryFailedPayment(repository, provider)
}