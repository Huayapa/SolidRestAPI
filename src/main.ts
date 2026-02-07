import { loadEnv, PORT } from "./config/env.ts";
import { startServer } from "./server.ts";



loadEnv()
const app = startServer()
app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto: ${PORT}`)
})