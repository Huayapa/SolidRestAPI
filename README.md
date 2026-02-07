# SolidRestAPI V1.0

Una API de procesamiento de pagos diseñada para demostrar los **principios SOLID** utilizando una **arquitectura hexagonal**, **arquitectura basada en features** y un enfoque de **monolito modular**.

## Modulos actuales
- Pagos

## Descripción del Proyecto

Este es un proyecto para mi portafolio de cómo construir aplicaciones escalables y mantenibles siguiendo los principios SOLID, implementando un sistema de procesamiento de pagos que permite:

- Procesar pagos mediante múltiples proveedores (Stripe, PayPal)
- Obtener historial de pagos
- Consultar estado de pagos individuales
- Reintentar pagos fallidos
- Sincronizar estado de pagos fallidos (Repositorio y Proveedor)

## Arquitectura

### Hexagonal (Puertos y Adaptadores)

La arquitectura se divide en tres capas:

```
Domain (Núcleo)
    ├── Entities: Objetos de negocio (Payment)
    ├── Value Objects: Money, Currency, PaymentStatus
    └── Ports: Interfaces (IPaymentRepository, IPaymentProvider)

Application (Casos de Uso)
    └── Use Cases: ProcessPayment, GetPayments, GetByIdPayment, etc.

Infrastructure (Detalles de Implementación)
    ├── HTTP: Controllers, Routes
    ├── Persistence: Repositorios (Memory)
    └── Providers: Proveedores de pagos (Stripe, PayPal)
```

### Basada en Features

El proyecto está organizado por dominios de negocio:

```
src/
├── modules/
│   └── payments/           # Feature de pagos
│       ├── application/    # Lógica de negocio
│       ├── domain/         # Reglas de negocio
│       ├── infrastructure/ # Detalles técnicos
|       └ # Aqui se pueden agregar mas features
└── shared/                 # Código compartido entre features
    └── domain/valueObjects/
```

## Principios SOLID Aplicados

### 1. **S** - Single Responsibility Principle
Cada clase tiene una única responsabilidad:
- `ProcessPayment`: Solo procesa pagos
- `GetPayments`: Solo obtiene el listado
- `PaymentRepository`: Solo persiste pagos

### 2. **O** - Open/Closed Principle
El código está abierto a extensión pero cerrado a modificación:
- Nuevos proveedores de pago se añaden implementando `IPaymentProvider`
- Sin cambiar código existente

```typescript
export interface IPaymentProvider {
  process(money: Money): Promise<boolean>
  getStatus(paymentId: string): Promise<ProviderStatus>
  cancel(paymentId: string): Promise<void>
}
```

### 3. **L** - Liskov Substitution Principle
Las implementaciones son intercambiables:
- `StripePaymentProvider` ↔ `PayPalPaymentProvider` ↔ Futuros Providers
- `PaymentRepository` (Memory) ↔ Futura BD (PostgreSQL, MongoDB, MySQL)

### 4. **I** - Interface Segregation Principle
Interfaces pequeñas y específicas:
- `IPaymentProvider`: Solo métodos de pago
- `IPaymentRepository`: Solo métodos de persistencia
- Sin métodos innecesarios

### 5. **D** - Dependency Inversion Principle
Dependencias inyectadas en constructores:
```typescript
export class ProcessPayment {
  constructor(
    PRepository: IPaymentRepository,
    PProvider: IPaymentProvider
  ) { }
}
```

## Estructura del Proyecto

```
paymentSolidAPI/
├── src/
│   ├── main.ts                          # Punto de entrada
│   ├── server.ts                        # Configuración del servidor
│   ├── config/
│   │   └── env.ts                       # Variables de entorno
│   ├── modules/
│   │   └── payments/
│   │       ├── application/
│   │       │   └── useCases/
│   │       │       ├── ProcessPayment.ts
│   │       │       ├── GetPayments.ts
│   │       │       ├── GetByIdPayment.ts
│   │       │       ├── CancelProcessPayment.ts
│   │       │       ├── RetryFailedPayment.ts
│   │       │       └── SyncFailedPayment.ts
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   └── Payment.ts
│   │       │   ├── ports/
│   │       │   │   ├── IPaymentProvider.ts
│   │       │   │   └── IPaymentRepository.ts
│   │       │   └── valueObjects/
│   │       │       └── PaymentStatus.ts
│   │       └── infrastructure/
│   │           ├── factories/           # Factory Pattern
│   │           ├── http/
│   │           │   ├── controller/      # HTTP Handlers
│   │           │   └── routes/          # Definición de rutas
│   │           ├── persistence/         # Repositorios
│   │           └── providers/           # Proveedores de pago
│   └── shared/
│       └── domain/valueObjects/
│           ├── Currency.ts
│           └── Money.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Cómo Ejecutar

### Requisitos Previos
- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd paymentSolidAPI

# Instalar dependencias
pnpm install
# o con npm
npm install
```

### Desarrollo

```bash
# Iniciar en modo desarrollo con hot reload
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

### Compilación

```bash
# Compilar TypeScript
pnpm build

# Ejecutar versión compilada
pnpm start
```

## Stack Tecnológico

- **Lenguaje**: TypeScript
- **Runtime**: Node.js (módulos ES)
- **Framework Web**: Express
- **Gestor de Paquetes**: pnpm
- **Tipado**: TypeScript strict mode

## Conceptos Aplicados

- **Arquitectura Hexagonal**: Separación clara entre dominio y adaptadores
- **Domain-Driven Design**: Value Objects y Entities
- **Factory Pattern**: Creación de casos de uso y proveedores
- **Dependency Injection**: Inyección de dependencias manual
- **Repository Pattern**: Abstracción de persistencia (No sabe como se guardan)
- **Strategy Pattern**: Múltiples proveedores de pago intercambiables

## Cambios pendientes

- [ ] Error Handling
- [ ] Testing
- [ ] Crear otros modulos

## Licencia

ISC
**Autor**: Josue Andres Huayapa Julca
**Última actualización**: 4 de febrero de 2026
