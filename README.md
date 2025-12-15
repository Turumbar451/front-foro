# Foro Universitario - Frontend

Este repositorio contiene el código fuente del cliente web para el sistema de Foro Universitario. El proyecto está construido utilizando una arquitectura moderna basada en **Astro** y **Svelte** para garantizar alto rendimiento e interactividad.

## Stack Tecnológico

- **Framework Principal:** [Astro](https://astro.build/) (v5.x) - Manejo de rutas y renderizado híbrido.
- **Interactividad:** [Svelte](https://svelte.dev/) (v5.x) - Componentes reactivos (Islas).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/).
- **Cliente HTTP:** [Axios](https://axios-http.com/) - Comunicación con el Backend.
- **Despliegue:** Netlify.

---

## Guía de Instalación y Compilación Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (v18 o superior)
- npm

### 1. Clonar el repositorio

```bash
git clone [https://github.com/Turumbar451/front-foro.git](https://github.com/Turumbar451/front-foro.git)
cd front-foro
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

aqui puedes usar la url de desarrollo o de produccion

```bash
PUBLIC_API_URL=http://localhost:8080/api
```

### 4. Ejecutar en modo desarrollo

levantar el servidor local en el puerto 4321 por defceto

```bash
npm run dev
```

### 5. Compilar para produccion

esto genera archivos estatico y optimizador para el servidor(dependiendo del modo de despliegue, se puede saltar este paso dado que este comando genera la carpeta /dist y es la que se sube al servicio pero hay otras formas)

```bash
npm run build
```

## Guía de Despliegue (Netlify)

El proyecto esta configurado para desplegarse automáticamente en Netlify.

### 1. Conectar Repositorio

1. Ingresa a tu cuenta de Netlify y selecciona **"Add new site"** > **"Import an existing project"**.
2. Selecciona **GitHub** y busca este repositorio (`front-foro`).
3. importante! se utilizo la rama mainEstable por problemas de git y prisas

### 2. Configuración de Build

Netlify detectará automáticamente Astro. Verifica los siguientes comandos:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### 3. Variables de Entorno

En la configuración del sitio en Netlify (**"Site configuration"** > **"Environment variables"**), se añade la siguiente variable apuntando al backend en Railway:

| Key              | Value                                   |
| :--------------- | :-------------------------------------- |
| `PUBLIC_API_URL` | `https://tu-backend-en-railway.app/api` |

### 4. Deploy

Haz clic en **"Deploy site"**. Netlify iniciará el proceso de construcción y te dará una URL pública.

---

## Documentación del Código (Estructura)

La arquitectura del proyecto sigue el patrón de **Islas de Astro**, separando el contenido estático de la interactividad.

### Directorios Principales (`/src`)

#### `/pages`

Define las rutas de la aplicación.

- **`index.astro`**: Página de aterrizaje (Landing page).
- **`publicaciones.astro`**: Muro principal que carga el componente Feed.
- **`publicaciones/[id].astro`**: Ruta dinámica para ver el detalle de un post.
- **`crear.astro`**: Página protegida para nuevos posts.

#### `/components`

Componentes reutilizables e interactivos (Svelte).

- **`/auth`**
  - `LoginForm.svelte` y `RegisterForm.svelte`: Formularios con validación y manejo de `localStorage`.
- **`/blog`**
  - `Feed.svelte`: Lista de posts con buscador reactivo.
  - `PostDetail.svelte`: Lógica para dar likes, eliminar posts y ver detalles.
  - `CommentsSection.svelte`: Gestión de comentarios asíncronos.
- **`/ui`**
  - Elementos visuales como `Navbar.svelte`.

#### `/layouts`

- **`Layout.astro`**: Plantilla base que incluye el `<head>`, `Navbar` y `Footer` comunes a todas las páginas. También inyecta los estilos globales.

#### `/services`

- **`api.ts`**: Configuración base de Axios (aunque el consumo se realiza directamente en los componentes para manejar el ciclo de vida `onMount` de Svelte).

#### `/interfaces`

- estructura de los datos

