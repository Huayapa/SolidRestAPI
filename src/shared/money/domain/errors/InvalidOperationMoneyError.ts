import { DomainError } from "../../../errors/DomainError.ts";

type operationtype = 'sumar' | 'restar' | 'multiplicar' | 'dividir' | 'comparar'
export class InvalidOperationMoneyError extends DomainError {
  readonly code:string = 'INVALID_OPERATION_MONEY'
  constructor(op: operationtype) {
    super(`No se pueden ${op} monedas de distintas divisas`)
  }
}