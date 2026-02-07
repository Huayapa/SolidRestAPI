import { DB_DRIVER } from "../../../../config/env.ts";
import { memoryPaymentRepository } from "./memory/PaymentInstance.ts";

export type DbDriver = 'memory';
export class PaymentRepositoryFactory {
  static create() {
    const driver:DbDriver = DB_DRIVER as DbDriver
    if (driver === 'memory') return memoryPaymentRepository
    throw new Error(`[Factory Error]: No existe un repositorio llamado "${driver}". `)
  }
}