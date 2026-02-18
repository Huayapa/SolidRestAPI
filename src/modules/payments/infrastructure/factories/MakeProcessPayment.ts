import { PaymentProviderFactory } from "../providers/PaymentProviderFactory.ts";
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts";
import { ProcessPayment } from "#payments/application/useCases/ProcessPayment.ts";

export function MakeProcessPayment() {
  const repository = PaymentRepositoryFactory.create()
  const provider = PaymentProviderFactory.create()
  return new ProcessPayment(repository, provider)
}