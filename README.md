# Dataplanning — Landing page nueva

Sitio estático de una sola página (HTML + CSS + JS puro, sin build ni dependencias),
basado en el diseño de `media/base landpage dataplanning 28.07.2026.pdf`.

## Estructura

```
src/
├── index.html          Toda la maquetación y el contenido de la página
├── css/styles.css       Estilos (paleta, tipografías, layout responsive)
├── js/main.js            Slider del hero, menú móvil, carrusel de clientes,
│                         envío del formulario de contacto (fetch -> php/contact.php)
├── php/contact.php       Endpoint que envía el formulario por email (mail() nativo de PHP,
│                         funciona en el hosting Arsys sin dependencias externas)
├── assets/
│   ├── fonts/            Franklin Extra Cond Gothic (titulares) y Montserrat (texto)
│   └── images/
│       ├── hero/         Fotos de las 3 variantes del hero + recorte del monumento a Colón
│       ├── sections/     Fotos de las secciones (playa, panots, Ramblas, recepción, equipo)
│       └── clients/      31 logotipos de clientes (PNG con transparencia real)
└── README.md
```

Todas las imágenes se generaron a partir de `media/Links.zip` (el paquete de imágenes
enlazadas del diseño original) y ya están optimizadas para web (redimensionadas y
comprimidas). Los logotipos de cliente originales eran TIFF CMYK+alfa (formato de
imprenta); se han convertido a PNG blanco con canal alfa real para que se vean bien
sobre el fondo azul marino.

## Previsualizar en local

No hace falta build. Basta con servir la carpeta con cualquier servidor estático, por
ejemplo:

```bash
cd src
python -m http.server 8090
```

y abrir `http://localhost:8090/`. El envío del formulario de contacto necesita PHP,
así que para probarlo de extremo a extremo hace falta un servidor con PHP
(`php -S localhost:8090` desde `src/`) en vez del servidor de Python.

## Despliegue en Arsys (hosting actual)

1. Por SFTP, entra en la carpeta `html/` de la cuenta de Arsys (es el document root de
   `https://www.dataplanning.es/`).
2. Vacía `html/` (todo lo que hay ahora es el WordPress antiguo: núcleo, temas, plugins,
   cachés). No toques el resto de carpetas de la cuenta (`data`, `cgi-bin`, `errors`,
   `logs`, `tmp`, `.ssh`) — son infraestructura del hosting, no de la web.
3. Sube el contenido de `src/` (no la carpeta `src` en sí, sino lo que hay dentro) a
   `html/`.
4. Comprueba que `hola@dataplanning.es` en `php/contact.php` es la dirección donde
   quieres recibir los mensajes del formulario.

## Pendiente / a decidir

- Sustituir los iconos sociales por los enlaces reales de Dataplanning (ahora mismo
  apuntan a las home de Facebook/X/Instagram/LinkedIn/YouTube).
- Revisar si se necesita volver a verificar el dominio en Google Search Console u otra
  herramienta (la web antigua tenía ficheros de verificación en `html/`).
- Opcional: convertir las fuentes `.ttf`/`.otf` a `.woff2` para reducir peso (no es
  necesario para el volumen de tráfico de esta web, pero es una mejora de rendimiento
  sencilla si se quiere más adelante).
