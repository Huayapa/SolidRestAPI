import { ProcessPayment } from "../../application/useCases/ProcessPayment.ts";
import { PaymentProviderFactory } from "../providers/PaymentProviderFactory.ts";
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts";

export function MakeProcessPayment() {
  const repository = PaymentRepositoryFactory.create()
  const provider = PaymentProviderFactory.create()
  return new ProcessPayment(repository, provider)
}