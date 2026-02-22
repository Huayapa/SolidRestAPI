/**
 * Breve Explicación de los status:
 * 400 - Bad Request - El servidor no puede procesar la solicitud por error del cliente
 * 404 - Not Found - El servidor no puede encontrar el recurso
 * 409 - Conflict - Solicitud valida pero no se procesara el recurso actual (Duplicidad, estados invalidos)
 * 500 - Internal Server Error - El servidor encontro una condición inesperada que impide la solicitud
 */

export const errorDictionary: Record<string, number> = {
  'INVALID_CURRENCY_ERROR': 400,
  'EXCHANGE_RATE_NOT_FOUND': 404,
  'INVALID_AMOUNT_MONEY': 400,
  'INVALID_EXCHANGE_RATE': 400,
  'INVALID_OPERATION_MONEY': 400,
  'INVALID_PAYMENT_STATUS_TRANSITION': 409,
  'PAYMENT_ALREADY_EXISTS': 409,
  'PAYMENT_NOT_FOUND': 404,
  'PROVIDER_PAYMENT_STILL_PENDING': 409
}