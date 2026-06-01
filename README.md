# PetAlert

Plataforma de gestión veterinaria migrada a **Angular 19** con componentes standalone, **Angular Material 3**, **TypeScript** y **SCSS**.

## Requisitos

- Node.js 20+
- npm 10+

## Instalación

```bash
npm install
```

Si aparece el error `Lock compromised`, ejecuta `npm cache clean --force` y vuelve a instalar, o usa otra herramienta (pnpm/yarn) en tu entorno.

## Desarrollo

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

## Rutas (igual que el prototipo React)

| Ruta | Descripción |
|------|-------------|
| `/` | Landing + login |
| `/admin` | Panel veterinario |
| `/admin/pets` | Mascotas |
| `/admin/emergencies` | Emergencias |
| `/admin/medical-history` | Historial médico |
| `/admin/appointments` | Citas |
| `/admin/reports` | Reportes |
| `/admin/users` | Usuarios |
| `/admin/settings` | Configuración |
| `/client` | Panel cliente |
| `/client/register-pet` | Registrar mascota |
| `/client/appointments` | Citas cliente |
| `/client/medical-history` | Historial cliente |

## Estructura

```
src/app/
  core/          guards, services, interfaces
  layouts/       admin-layout, client-layout
  pages/         landing, admin/*, client/*
  shared/        sidebar, topbar, footer, calendar, icons
```

El código React original está en `_legacy-react/` como referencia.

## Stack

- Angular 19 (standalone)
- Angular Material 3
- Chart.js (gráficos del dashboard y reportes)
- SCSS con tokens de diseño PetAlert (#2563EB, #10B981, etc.)
