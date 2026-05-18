# Carnicería Vicente Valencia — Tienda Online

Aplicación web de comercio electrónico para la Carnicería Vicente Valencia (Cuenca). Permite a los clientes consultar el catálogo de productos, realizar pedidos online y pagarlos con tarjeta o en tienda al recoger.

## Tecnologías

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Base de datos**: Neon (PostgreSQL serverless) via `@neondatabase/serverless`
- **Pagos**: Stripe (Checkout + Webhooks)
- **Almacenamiento de imágenes**: Vercel Blob
- **Autenticación**: JWT (`jsonwebtoken` + `jose` para Edge Runtime)
- **Email**: Nodemailer con Gmail
- **Despliegue**: Vercel

## Funcionalidades

### Tienda
- Catálogo de productos frescos (ternera, cerdo, cordero, aves y conejos)
- Catálogo de productos elaborados (embutidos caseros, elaborados)
- Página de detalle por producto con precio y descripción
- Buscador de productos
- Carrito de compra persistente (Context API)

### Pedidos ⚠️ actualmente deshabilitados

La funcionalidad de carrito y pedidos está implementada pero **comentada temporalmente**. Para activarla, descomentar los bloques marcados con `{/* COMENTADO - ... */}` en los siguientes archivos:

| Qué | Archivos |
|-----|----------|
| Botón "Añadir a la cesta" (grid y lista) | `productos-frescos/*/page.tsx`, `productos-elaborados/*/page.tsx`, `charcuteria/page.tsx`, `busqueda/BusquedaClient.tsx` |
| Contador + botón añadir en detalle de producto | `detalle-productos/[id]/page.tsx` |
| Indicador de stock | Mismas páginas de productos |
| Icono del carrito en la navbar | `componentes/navbar.tsx` |
| Botones del popup del carrito | `componentes/PopupCarrito.tsx` |
| Botón "Realizar el pedido" en el carrito | `carrito/page.tsx` |
| Enlace "Haz tu pedido" en el footer | `componentes/footer.tsx` |
| Sección "Mis pedidos" en Mi Cuenta | `micuenta/page.tsx` |

Una vez descomentado, los pedidos soportan:
- Dos métodos de pago: tarjeta (Stripe Checkout) o pago al recoger en tienda
- Confirmación de pedido por email automática
- Notificación por email cuando el pedido está listo para recoger

### Cuenta de usuario
- Registro e inicio de sesión con JWT
- Área privada: historial de pedidos, información personal, ajustes de cookies
- Protección de rutas privadas via middleware (Edge Runtime)

### Administración
- Panel para gestionar pedidos (`/api/admin/pedidos`)
- Gestión de productos con subida de imágenes a Vercel Blob
- Cambio de estado de pedidos

### Otros
- Correo de bienvenida al registrarse
- Página de contacto
- Sección de reseñas Google
- Páginas legales (aviso legal, política de privacidad, términos y condiciones)
- Aviso y gestión de cookies

## Estructura del proyecto

```
app/
├── api/                        # Rutas API (servidor)
│   ├── admin/pedidos/          # Gestión de pedidos (admin)
│   ├── auth/                   # Login, registro, actualizar datos
│   ├── pedidos/                # Crear pedido y confirmar
│   ├── productos/              # CRUD de productos
│   ├── stripe-webhook/         # Webhook de Stripe
│   └── subir-imagen/           # Subida a Vercel Blob
├── componentes/                # Navbar, Footer, Carrito, Cookies...
├── contextos/                  # CarritoContexto
├── styles/                     # CSS global y módulos
├── micuenta/                   # Área privada del usuario
├── productos-frescos/          # Páginas por categoría
├── productos-elaborados/
├── registrologin/              # Login y registro
└── ...                         # Resto de páginas
lib/
├── email.ts                    # Funciones de envío de correo
└── rateLimit.ts                # Rate limiting in-memory para endpoints de auth
middleware.ts                   # Protección de rutas (Edge Runtime)
```

## Variables de entorno

Crea un archivo `.env.development.local` en la raíz con las siguientes variables:

```env
# Base de datos (Neon)
DATABASE_URL=

# Email (Gmail)
GMAIL_USER=
GMAIL_APP_PASSWORD=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_URL=
BLOB_READ_WRITE_TOKEN=
JWT_SECRET=
```

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Arrancar en local
npm run dev

# Build de producción
npm run build
```

## Despliegue

El proyecto está configurado para desplegarse automáticamente en Vercel desde la rama `main`. Las variables de entorno deben estar configuradas en el dashboard de Vercel.
