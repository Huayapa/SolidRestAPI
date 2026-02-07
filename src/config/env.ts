import dotenv from "dotenv";

export const {
  PORT = 3000,
  DB_DRIVER = 'memory',
  PAYMENT_GATEWAY = 'paypal'
} = process.env

export function loadEnv() {
  dotenv.config()
  const required = [
    'PORT',
  ]

  for (const key of required) {
    if(!process.env[key]) throw new Error(`Variable de entorno no encontrada: ${key}`)
  }
}

