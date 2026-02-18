import { CancelProcessPayment } from "#payments/application/useCases/CancelProcessPayment.ts"
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts"
import { PaymentProviderFactory } from "../providers/PaymentProviderFactory.ts"

export function MakeCancelProcessPayment() {
  const repository = PaymentRepositoryFactory.create()
  const provider = PaymentProviderFactory.create()
  return new CancelProcessPayment(repository, provider)
}