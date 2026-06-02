# Tarea React MJJ

Base inicial para el taller de React sobre login y gestion de cursos.

## Gestor de paquetes

Usar `pnpm` si está disponible.

Si `pnpm` no está disponible se puede usar `npm.cmd` en Windows:

```bash
npm.cmd install
npm.cmd run dev
```

Si `pnpm` está disponible:

```bash
pnpm install
pnpm dev
```

## Credenciales de prueba

Usa estas credenciales en la pantalla de login:

- Usuario: `admin`
- Contraseña: `adminpass`

El formulario viene precargado con esos valores.

## Ejecutar

```bash
npm.cmd install
npm.cmd run dev
```

O con pnpm:

```bash
pnpm install
pnpm dev
```

## Estructura

```text
src/
  api/
    client.js
  auth/
    AuthContext.jsx
    ProtectedRoute.jsx
  components/
    CourseForm.jsx
  pages/
    LoginPage.jsx
    CoursesPage.jsx
  App.jsx
  main.jsx
  styles.css
```

## Rutas de la API

El frontend usa estas rutas:

- Login: `POST http://localhost:8080/auth/api/auth/login`
- Cursos: `GET http://localhost:8080/auth/api/courses`

## Pendiente por implementar

- Crear cursos con `POST http://localhost:8080/auth/api/courses`.
- Enviar `Authorization: Bearer TOKEN` para las peticiones protegidas.
