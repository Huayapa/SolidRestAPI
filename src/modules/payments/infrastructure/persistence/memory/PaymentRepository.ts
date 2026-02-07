import { Payment } from "../../../domain/entities/Payment.ts";
import type { IPaymentRepository } from "../../../domain/ports/IPaymentRepository.ts";

export class MemoryPaymentRepository implements IPaymentRepository {
  private static db: Payment[] = []

  async save(payment: Payment): Promise<void> {
    const idb = MemoryPaymentRepository.db.findIndex(p => p.id === payment.id)
    if(idb >= 0) {
      MemoryPaymentRepository.db[idb] = payment
      return
    }
    MemoryPaymentRepository.db.push(payment)
  }

  async findById(id: string): Promise<Payment | null> {
    return MemoryPaymentRepository.db.find(payment => payment.id === id) ?? null
  }

  async findAll(): Promise<Payment[]> {
    return [...MemoryPaymentRepository.db]
  }
}