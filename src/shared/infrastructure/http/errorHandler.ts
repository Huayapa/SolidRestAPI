import type { ErrorRequestHandler } from "express"
import { errorDictionary } from "./errorDictionary.ts"
import { DomainError } from "#shared/domain/errors/DomainError.ts"
import { HttpError } from "./httpError.ts"

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if(err instanceof HttpError) {
    return res.status(err.status).json({error: err.message})
  }
  if(err instanceof DomainError) {
    const status = errorDictionary[err.code] ?? 500
    if (status === 500) console.error('Error de domainError no asignado:', err.code)
    return res.status(status).json({
      error: err.message || 'Internal server error'
    })
  }
  console.error('Error Inesperado:', err)
  return res.status(500).json({ error: 'Internal server error' })
}