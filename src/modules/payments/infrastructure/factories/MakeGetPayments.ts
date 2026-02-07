import { GetPayments } from "../../application/useCases/GetPayments.ts";
import { PaymentRepositoryFactory } from "../persistence/PaymentRepositoryFactory.ts";

export function MakeGetPayments() {
  const repository = PaymentRepositoryFactory.create()
  return new GetPayments(repository)
}