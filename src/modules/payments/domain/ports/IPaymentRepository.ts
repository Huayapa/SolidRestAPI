import type { Payment } from "../entities/Payment.ts"

export interface IPaymentRepository {
  save(payment: Payment): Promise<void>
  findById(id: string): Promise<Payment | null>
  findAll(): Promise<Payment[]>
}