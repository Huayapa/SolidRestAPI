import { Money } from "../../../../shared/money/domain/Money.ts";
import type { PaymentStatus} from "../valueObjects/PaymentStatus.ts";

export class Payment {
  public readonly id: string
  private money: Money
  private status: PaymentStatus
  constructor(id: string,money: Money,status: PaymentStatus){
    this.id = id,
    this.money = money,
    this. status = status
  }

  public processSuccess():void {
    this.status = this.status.complete()
  }

  public processFail():void {
    this.status = this.status.fail()
  }

  public processCancel():void {
    this.status = this.status.cancel()
  }

  public getStatus(): PaymentStatus {
    return this.status
  }
  public getMoney():Money {
    return new Money(this.money.amount, this.money.currency)
  }

  public getSnapshot() {
    return {
      id: this.id,
      money: {
        amount: this.money.amount,
        currency: this.money.getCurrencyValue(),
      },
      status: this.status.value
    }
  }
}