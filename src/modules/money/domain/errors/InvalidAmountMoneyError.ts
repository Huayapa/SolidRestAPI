import { DomainError } from "../../../../shared/errors/DomainError.ts";

export class InvalidAmountMoneyError extends DomainError {
  readonly code:string = 'INVALID_AMOUNT_MONEY'
  constructor() {
    super('La cantidad no puede ser menor a 0')
  }
}
