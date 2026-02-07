
export type AllowedCurrency = 'USD' | 'PE' | 'MX'
export class Currency {
  private readonly allowed: AllowedCurrency[] = ['USD', 'PE', 'MX']
  public readonly value:AllowedCurrency

  constructor(value:AllowedCurrency) {
    this.value = value
    if(!this.allowed.includes(value)) {
      throw new Error(`Divisa invalida: ${value}. Permitidas ${this.allowed}`)
    }
  }

  public equals(otherCurrency: Currency):boolean {
    return this.value === otherCurrency.value
  }

  public getValue(): AllowedCurrency {
    return this.value
  }
}