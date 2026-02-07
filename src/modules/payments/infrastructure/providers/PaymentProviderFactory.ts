import { PAYMENT_GATEWAY } from "../../../../config/env.ts";
import { PayPalPaymentProvider } from "./PayPalPaymentProvider.ts";
import { StripePaymentProvider } from "./StripePaymentProvider.ts";


export type PaymentGateway = 'stripe' | 'paypal';
export class PaymentProviderFactory {
  static create() {
    const gateway:PaymentGateway = PAYMENT_GATEWAY as PaymentGateway
    if(gateway === 'stripe') return new StripePaymentProvider()
    if(gateway === 'paypal') return new PayPalPaymentProvider()
    throw new Error(`[Factory Error]: No existe una implementación para el gateway "${gateway}". `)
  }
}