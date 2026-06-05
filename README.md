# SIGOP Frontend

> Interfaz web para el **Sistema de Información y Control de Producción** — construida con React, Vite, TypeScript y TailwindCSS v4.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 18 + TypeScript 5 |
| Build tool | Vite 6 |
| Estilos | TailwindCSS v4 (tokens de color del sistema original) |
| Estado global | Zustand 5 (con persistencia en `localStorage`) |
| HTTP | Axios con interceptor JWT |
| Routing | React Router DOM v6 |
| Gráficas | Apache ECharts via `echarts-for-react` |
| Notificaciones | Sonner |
| Iconos | Material Symbols Outlined (Google Fonts) |
| Tipografía | Inter (Google Fonts) |

---

## Requisitos previos

- **Node.js** ≥ 18
- El **backend SIGOP** corriendo en `http://localhost:1206` (ver `sigop-backend/README.md`)

---

## Instalación y puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
#    Solo es necesario si el backend NO está en localhost:1206

# 3. Iniciar en modo desarrollo
npm run dev
```

La aplicación queda disponible en **http://localhost:5173**

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compilar TypeScript + generar build de producción en `dist/` |
| `npm run preview` | Previsualizar el build de producción localmente |

---

## Variables de entorno

```env
# URL base de la API del backend
VITE_API_URL=http://localhost:1206/api
```

---

## Estructura del proyecto

```
sigop-frontend/
├── index.html                  # Entry point HTML — carga fuentes Inter + Material Symbols
└── src/
    ├── main.tsx                # Monta la app en #root
    ├── App.tsx                 # Raíz — AppRouter + Toaster (Sonner)
    ├── index.css               # Estilos globales + @theme de Tailwind v4
    │
    ├── api/                    # Capa de comunicación con el backend
    │   ├── axios.ts            # Instancia Axios con interceptor JWT y redirect en 401
    │   ├── auth.api.ts
    │   ├── dashboard.api.ts
    │   ├── usuarios.api.ts
    │   ├── materiales.api.ts
    │   └── bodegas.api.ts
    │
    ├── store/
    │   └── authStore.ts        # Zustand: token · usuario · permisos · login · logout
    │
    ├── types/                  # Interfaces TypeScript por dominio
    │   ├── auth.types.ts
    │   ├── usuario.types.ts
    │   ├── material.types.ts
    │   └── bodega.types.ts
    │
    ├── hooks/
    │   └── usePageTitle.ts     # Actualiza document.title en cada página
    │
    ├── router/
    │   ├── AppRouter.tsx       # Árbol de rutas (públicas + protegidas)
    │   └── ProtectedRoute.tsx  # Redirige a /login si no hay token en el store
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppLayout.tsx   # Shell principal: Sidebar + Topbar + <Outlet />
    │   │   ├── Sidebar.tsx     # Barra lateral oscura con grupos colapsables
    │   │   └── Topbar.tsx      # Barra superior: buscador · notificaciones · avatar · logout
    │   │
    │   ├── ui/                 # Componentes reutilizables
    │   │   ├── Button.tsx      # Variantes: primary · secondary · danger · ghost
    │   │   ├── Input.tsx       # Input y Select con label y mensaje de error
    │   │   ├── Badge.tsx       # Badge de estado (activo/inactivo) y de rol/permiso
    │   │   ├── Modal.tsx       # Modal con backdrop, scroll y animación de entrada
    │   │   └── PageHeader.tsx  # Cabecera de página con sección, título y acción
    │   │
    │   ├── dashboard/
    │   │   ├── StatCards.tsx   # 4 tarjetas de contadores (bodegas/materiales activos e inactivos)
    │   │   ├── ChartDonut.tsx  # Donut ECharts: activos vs inactivos
    │   │   └── ChartBar.tsx    # Barras ECharts con click handler → detalle en Sonner
    │   │
    │   ├── usuarios/
    │   │   ├── UsuariosTable.tsx      # Tabla con avatar, rol, permisos, estado toggle
    │   │   ├── CreateUsuarioModal.tsx # Modal de creación con selector de rol
    │   │   ├── EditUsuarioModal.tsx   # Modal de edición con cambio de estado
    │   │   └── PermisosPopup.tsx      # Permisos agrupados por módulo con toggle grupal
    │   │
    │   ├── materiales/
    │   │   ├── MaterialesTable.tsx      # Tabla con toggle de estado inline
    │   │   ├── CreateMaterialModal.tsx
    │   │   └── EditMaterialModal.tsx
    │   │
    │   └── bodegas/
    │       ├── BodegasTable.tsx
    │       ├── CreateBodegaModal.tsx
    │       └── EditBodegaModal.tsx
    │
    └── pages/
        ├── auth/
        │   ├── LoginPage.tsx           # Formulario de login con manejo de error inline
        │   ├── ForgotPasswordPage.tsx  # Solicitud de reset (email + emailAdmin)
        │   └── ResetPasswordPage.tsx   # Nueva contraseña desde enlace del email
        ├── DashboardPage.tsx           # Stats + 2 donuts + 2 barras + acciones rápidas
        ├── UsuariosPage.tsx
        ├── MaterialesPage.tsx
        └── BodegasPage.tsx
```

---

## Rutas

| Ruta | Protegida | Descripción |
|------|-----------|-------------|
| `/login` | — | Inicio de sesión |
| `/forgot-password` | — | Solicitar enlace de recuperación |
| `/reset-password` | — | Restablecer contraseña (token en query param) |
| `/dashboard` | ✓ | Estadísticas globales y gráficas ECharts |
| `/usuarios` | ✓ | CRUD completo de usuarios — solo rol `admin` |
| `/materiales` | ✓ | Inventario de materiales con filtro activo/inactivo |
| `/bodegas` | ✓ | Inventario de bodegas con filtro activo/inactivo |
| `/` | ✓ | Redirige a `/dashboard` |

---

## Autenticación y sesión

El flujo de autenticación funciona así:

1. El usuario envía `POST /api/auth/login`.
2. El JWT recibido se guarda en el **Zustand store** con persistencia en `localStorage` (`sigop-auth`).
3. Axios adjunta automáticamente el header `Authorization: Bearer <token>` en cada petición gracias al interceptor en `src/api/axios.ts`.
4. Si cualquier respuesta devuelve `401`, el interceptor llama a `logout()` y redirige a `/login`.
5. El `ProtectedRoute` verifica la existencia del token en el store antes de renderizar cualquier ruta privada.

---

## Tokens de color (TailwindCSS v4)

Los colores del sistema original de Laravel se replican exactamente mediante variables CSS en el bloque `@theme` de `src/index.css`:

```css
--color-primary: #0e1c2b          /* Azul marino oscuro — sidebar, botones primarios */
--color-primary-container: #233141
--color-secondary: #47607e         /* Azul medio — badges de rol */
--color-secondary-container: #c2dcff
--color-surface: #f9faf5           /* Fondo general de la app */
--color-surface-container-low: #f3f4f0
--color-surface-container: #edeeea
--color-on-surface: #1a1c1a        /* Texto principal */
--color-on-surface-variant: #454652
--color-outline: #767683
--color-error: #ba1a1a
```

Estas variables se consumen directamente con utilidades de Tailwind: `bg-primary`, `text-on-surface`, `border-outline`, etc.

---

## Módulos implementados

### Dashboard

- 4 tarjetas de contadores: **Bodegas Activas**, **Bodegas Inactivas**, **Materiales Activos**, **Materiales Inactivos**.
- 2 gráficas **donut** (ECharts): bodegas activas vs inactivas / materiales activos vs inactivos.
- 2 gráficas de **barras** (ECharts): bodegas por referencia / materiales por ítem.
- **Click en barra** → llama a la API para obtener el detalle y lo muestra en un toast de **Sonner**.
- Panel de acciones rápidas con accesos directos a Materiales, Bodegas y Usuarios.

### Usuarios *(solo rol admin)*

- Tabla con avatar generado desde iniciales, badge de rol, lista de permisos condensada y toggle de estado.
- **Modal de creación**: nombre, email, contraseña, selector de rol y acceso al `PermisosPopup`.
- **Modal de edición**: mismos campos + selector de estado (activo/inactivo).
- **PermisosPopup**: permisos agrupados por módulo con checkbox maestro por grupo (indeterminate state incluido).

### Materiales / Bodegas

- Filtro de estado por pestañas (**Activos** / **Inactivos**) en la misma página.
- Toggle de estado inline desde la tabla (click en el badge).
- Modales de creación y edición sin navegación entre páginas.
- Feedback de todas las operaciones vía toasts de Sonner.

---

## Convenciones de código

- Los **componentes** usan `PascalCase` y se exportan con nombre (`export function`).
- Los **hooks** usan `camelCase` con prefijo `use`.
- Las **llamadas a la API** están centralizadas en `src/api/` — los componentes nunca usan `axios` directamente.
- El **estado de UI** (modales abiertos, item seleccionado) vive en el componente de página (`UsuariosPage`, etc.) y se baja como props.
- El **estado global** (token, usuario) vive exclusivamente en Zustand.
- Los **toasts** de éxito y error se lanzan desde los manejadores del formulario, no desde los componentes de tabla.
