# IMPRIMEVERS | Lab 3D & Web Development

Plataforma web y taller de manufactura aditiva enfocado en el desarrollo de hardware accesible, figuras articuladas y coleccionables en Cuernavaca, Morelos.

## 🚀 Sobre el Proyecto

**IMPRIMEVERS** es una iniciativa de desarrollo co-creada en un taller familiar, combinando programación web fullstack, modelado 3D de precisión en Blender y extrusión FDM. Diseñado para ofrecer piezas robustas de alta rotación (como coleccionables escolares de 5 a 12 gramos) con acabados y tolerancias optimizadas.

## 🛠️ Stack Tecnológico & Herramientas

- **Frontend Web:** Astro, Tailwind CSS, JavaScript nativo.
  
- **Modelado & Ingeniería 3D:** Blender (con scripts personalizados en Python y utilidades de automatización), Blockbench.
  
- **Manufactura:** Impresora FDM Creality Ender 3 V3 SE.
  
- **Despliegue:** Vercel.
  

## 📦 Estructura del Repositorio

Plaintext

```
imprimevers/
├── public/              # Recursos estáticos, logos y galería de fotos
├── src/
│   ├── components/      # Componentes modulares de Astro (Hero, Navbar, Portfolio, etc.)
│   ├── data/            # Arreglos de configuración (FAQs, productos, etc.)
│   └── layouts/         # Layout principal de la página
└── astro.config.mjs     # Configuración de Astro
```

## ⚙️ Instalación y Desarrollo Local

Si deseas clonar y levantar el entorno de desarrollo en tu máquina local:

1. **Clona el repositorio:**
   
   Bash
   
   ```
   git clone https://github.com/malkavianikkaku-gif/imprimevers.git
   cd imprimevers
   ```
   
2. **Instala las dependencias:**
   
   Bash
   
   ```
   npm install
   ```
   
3. **Ejecuta el servidor de desarrollo local:**
   
   Bash
   
   ```
   npm run dev
   ```
   
   Abre [http://localhost:4321](http://localhost:4321/) en tu navegador para ver la interfaz en tiempo real.

## 📊 Analítica (GA4 y Meta Pixel)

La página ya tiene los eventos listos (visitas y clics de WhatsApp). Solo faltan los IDs:

1. Copia `.env.example` a `.env`.
2. Pega tus IDs reales:
   - **GA4:** Administrador > Flujos de datos > tu sitio web > *ID de medición* (`G-XXXXXXXXXX`).
   - **Meta Pixel:** Events Manager > Orígenes de datos > tu píxel > *ID del píxel* (15-16 dígitos).
3. Vuelve a construir o desplegar el sitio.

Si los IDs están vacíos, los scripts no se cargan y la página funciona normal. En Vercel, configura `PUBLIC_GA4_ID` y `PUBLIC_META_PIXEL_ID` en *Settings > Environment Variables*.

   

## 📄 Licencia y Créditos

Proyecto desarrollado por **Malvavysco** en colaboración creativa con **Bobonsam** (Ángel). Todos los derechos reservados © 2026.