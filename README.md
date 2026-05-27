# 🚀 RIMAC Frontend Challenge – Seguro Salud Flexible

Aplicación frontend para cotizar seguros de salud, desarrollada con **React + TypeScript + Vite + Tailwind CSS + Redux Toolkit**.  
El proyecto sigue una arquitectura monorepo con **pnpm workspaces**, componentes reutilizables, diseño responsive, validaciones y consumo de APIs.

---

## 📦 Tecnologías utilizadas

| Área            | Tecnologías |
|----------------|-------------|
| **Frontend**    | React 18, TypeScript, Vite, React Router DOM |
| **Estado**      | Redux Toolkit (con slices) |
| **Formularios** | React Hook Form + Zod |
| **Estilos**     | Tailwind CSS (utility-first) + clsx |
| **Peticiones**  | Axios |
| **Notificaciones** | Sonner (toasts) |
| **Testing**     | Vitest + React Testing Library + Jest DOM |
| **Monorepo**    | pnpm workspaces (paquetes `shared` y `app`) |
| **Fuentes**     | Lato (principal), Inter (fallback) – como en el Figma |

---

## 🧠 Características implementadas

### Fase 1 – Datos personales
- ✅ Formulario con validaciones (DNI 8 dígitos, celular 9, checkbox obligatorio).
- ✅ Consumo de API `/user.json` para obtener nombre y fecha de nacimiento.
- ✅ Guardado en Redux (datos de usuario y del formulario).
- ✅ Layout responsive de dos columnas (imagen + formulario) – fiel al Figma.

### Fase 2 – Selección de quién cotiza y planes
- ✅ Stepper horizontal (Desktop) / compacto (Mobile).
- ✅ Dos tarjetas: "Para mí" / "Para alguien más" con radio button y iconos.
- ✅ Consumo de API `/plans.json` y filtrado por edad (plan.age >= user.age).
- ✅ Aplicación de descuento del 5% al elegir "Para alguien más".
- ✅ Carrusel en móvil (una tarjeta + flechas + paginación).
- ✅ Al seleccionar un plan, se guarda en Redux y redirige a resumen.

### Fase 3 – Resumen
- ✅ Muestra datos del usuario, datos del formulario y plan elegido.
- ✅ Precio con descuento (si aplica).
- ✅ Botón "Volver" que regresa a la selección de planes.
- ✅ Diseño responsive (tarjeta centrada, paddings exactos).

### Extras (Plus) implementados
- ✅ **Tipografía exacta** (Lato configurada como fuente principal).
- ✅ **Pruebas unitarias** (componentes `Button`, `PlanCard` y validaciones de formulario).
- ✅ **Despliegue** (Netlify / Vercel) – instrucciones incluidas.
- ✅ **Código limpio**, componentes reutilizables, TypeScript estricto.
- ✅ **Arquitectura monorepo** con pnpm workspaces.

---

## 📁 Estructura del proyecto (monorepo)
rimac-challenge/
├── packages/
│ ├── shared/ # Componentes reutilizables (Button, Checkbox, Layout, Stepper...)
│ └── app/ # Aplicación principal (páginas, store, servicios)
├── .env.example
├── .gitignore
├── package.json # Raíz con scripts y workspaces
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── netlify.toml # Configuración de despliegue (opcional)


---

## 🚀 Instalación y ejecución en local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/rimac-challenge.git
cd rimac-challenge

npm install -g pnpm   # si no tienes pnpm
pnpm install

pnpm dev
pnpm test
