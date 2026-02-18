import { SyncFailedPayment } from "#payments/application/useCases/SyncFailedPayment.ts"
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts"
import { PaymentProviderFactory } from "../providers/PaymentProviderFactory.ts"

export function MakeSyncFailedPayment() {
  const repository = PaymentRepositoryFactory.create()
  const provider = PaymentProviderFactory.create()
  return new SyncFailedPayment(repository, provider)
}