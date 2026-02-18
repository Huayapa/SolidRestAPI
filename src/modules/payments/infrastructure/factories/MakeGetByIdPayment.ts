import { GetByIdPayment } from "#payments/application/useCases/GetByIdPayment.ts";
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts";

export function MakeGetByIdPayments() {
  const repository = PaymentRepositoryFactory.create()
  return new GetByIdPayment(repository)
}