import { DB_DRIVER } from "../../../../config/env.ts";
import type { ExchangeRateRepository } from "../../domain/ports/ExchangeRateRepository.ts";
import { MemoryExchangeRateRepository } from "./MemoryExchangeRateRepository.ts";

export type DbDriver = 'memory';
export class MoneyRepositoryFactory {
  static create():ExchangeRateRepository {
    const driver:DbDriver = DB_DRIVER as DbDriver
    if (driver === 'memory') return new MemoryExchangeRateRepository()
    throw new Error(`[Factory Error]: No existe un repositorio llamado "${driver}". `)
  }
}