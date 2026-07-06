# Recircular Puerto Rico

> **Una propuesta ciudadana abierta para cerrar el ciclo del aluminio en la isla.**
> No es un plan oficial. Es una invitación a leer, comentar, mejorar y,
> si el Gobierno de Puerto Rico lo estima útil, tomar en serio.

[![Licencia del código: MIT](https://img.shields.io/badge/código-MIT-blue.svg)](LICENSE)
[![Licencia de los datos: CC BY 4.0](https://img.shields.io/badge/datos-CC_BY_4.0-lightgrey.svg)](LICENSE-DATA)
[![Bilingue](https://img.shields.io/badge/biling%C3%BCe-ES%20%2F%20EN-2ea44f.svg)](#-el-sitio-bilingue)
[![Construido sin frameworks](https://img.shields.io/badge/sin_build-HTML%20%2F%20CSS%20%2F%20JS-orange.svg)](#-cómo-está-hecho)

---

## ¿Qué es esto?

Cada año, Puerto Rico consume aproximadamente **17 000 toneladas de
latas de aluminio** (unos **1 400 millones de latas**). Casi todo se
exporta como fardo de chatarra, viaja por barco bajo la **Ley Jones**
a fundidores en Texas o Mississippi, y regresa meses después como
lata nueva importada.

**Recircular** propone cerrar ese ciclo dentro de la isla:

1. Un **sistema de depósito-reembolso (DRS)** de **5¢ por lata**, similar
   a los que ya operan en otros 50 países.
2. Una **red de puntos de entrega** en los 78 municipios.
3. Una **planta secundaria de aluminio** construida con estándar
   **FORTIFIED Commercial** para resistir huracanes, alimentada con
   crédito fiscal federal **§45X** y, posiblemente, un **bono verde
   municipal**.

El resultado proyectado: pasar de una tasa de reciclaje de latas del
**1,8 %** actual a **75 %** en el **Año 7**, con **62 empleos
directos** y unos **155 indirectos/inducidos**.

**Este repositorio contiene la propuesta completa, los datos que la
sustentan, las fuentes citadas y el código del sitio web.**

---

## ⚠️ Una nota importante sobre el tono

Este proyecto es una **propuesta ciudadana**, no un plan del Gobierno
ni un estudio encargado por una agencia. Está abierto a cualquier
persona que quiera leerlo, comentarlo, mejorarlo, traducirlo o
impulsarlo.

Si el Gobierno de Puerto Rico — o cualquier municipio, organización,
empresa o ciudadano particular — lo encuentra útil y decide tomarlo en
serio, con gusto se incorpora como una versión derivada. Mientras
tanto, esto es trabajo voluntario y abierto.

---

## 📊 Cifras clave (verifica antes de citar)

| Métrica                            | Valor                                     |
| ---------------------------------- | ----------------------------------------- |
| Latas generadas en PR al año       | 17 000 t (1 400 millones de latas)        |
| Tasa de reciclaje actual           | **1,8 %**                                 |
| Tasa objetivo (DRS 5¢, Año 7)      | **75 %**                                  |
| CAPEX escenario medio              | **$52 M** (base $48,85 M + 10 % cont.)    |
| OPEX anual                         | **$12,3 M** (≈ $820 / t)                  |
| Recuperación de la inversión       | **3,0 años** (rango 2,5–3,5)              |
| TIR a 20 años                      | **14–18 %**                               |
| Empleos directos                   | **62**                                    |
| Indirectos + inducidos (IMPLAN 2,5×)| **155**                                  |
| Ahorro de energía vs. aluminio virgen | **95 %**                               |
| Depósito propuesto (DRS)           | **5¢ por lata**                           |
| Prima eléctrica industrial PR vs. EE. UU. | **≈ 2,5×**                       |

> **Por qué importa el Año 7 (no el Año 5):** la curva de reciclaje
> sube rápido una vez el DRS y la red de puntos de entrega están
> funcionando, pero la velocidad depende de la logística, los
> hábitos y los acuerdos con los municipios. Brasil e Islandia
> muestran que llegar a 75 % toma tiempo, y forzarlo a cinco años
> subestima la realidad operativa. **Año 7 es la meta honesta.**

---

## 🗂️ Estructura del repositorio

```
pr-aluminum-recycling/
├── README.md                  ← este archivo
├── LICENSE                    ← MIT (código)
├── LICENSE-DATA               ← CC BY 4.0 (datos e investigación)
├── CONTRIBUTING.md            ← cómo contribuir
├── CODE_OF_CONDUCT.md         ← código de conducta
├── .github/
│   ├── ISSUE_TEMPLATE/        ← plantillas para reportar problemas
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                      ← el sitio web (lo que se publica en GitHub Pages)
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── recircular-onepage.pdf ← PDF de 32 páginas A4 (también servido por Pages)
│   ├── DESIGN.md              ← especificación de diseño (14 secciones)
│   └── assets/                ← 7 archivos JSON que alimentan los gráficos
├── research/                  ← 5 documentos de investigación
│   ├── pr-context.md          ← contexto industrial, económico y regulatorio de PR
│   ├── country-cases.md       ← Brasil, Islandia, California, Nueva York, etc.
│   ├── engineering-tech.md    ← proceso, equipos, balance energético
│   ├── engineering-budget.md  ← desglose de CAPEX, build-up de OPEX
│   └── funding-model.md       ← estructura de capital de 7 fuentes
```

---

## 🇪🇸 / 🇺🇸 El sitio bilingüe

El sitio (`docs/index.html`) es **bilingüe español/inglés** con un
selector en la esquina superior derecha. El contenido de cada
sección está definido en `docs/assets/translations.json` con
**325 claves** por idioma, sin cadenas huérfanas ni vacías.

Si encuentras un problema de traducción o quieres mejorar el texto
en cualquiera de los dos idiomas, **por favor abre un *issue* con la
etiqueta `i18n`** — la paridad entre idiomas importa.

---

## 🧩 ¿Cómo está hecho?

**Sin frameworks, sin paso de compilación, sin npm.** Solo HTML, CSS
y JavaScript puro.

- **Gráficos:** [D3 v7](https://d3js.org/) (CDN)
- **Mapa:** [Leaflet](https://leafletjs.com/) con teselas de
  [OpenStreetMap](https://www.openstreetmap.org/) (sin clave API)
- **Datos:** seis archivos JSON en `docs/assets/` que el JavaScript
  consume en tiempo real

Esto significa que cualquiera puede clonar el repositorio, abrir
`docs/index.html` en un navegador y ver la propuesta tal como se
publicará — sin instalar nada.

---

## 🖥️ Cómo verlo en local

```bash
cd docs
python3 -m http.server 8765
# abrir http://127.0.0.1:8765
```

> **¿Por qué no abrir el HTML directamente con `file://`?** El
> navegador bloquea las peticiones a los JSON cuando el origen es
> `file://`. Un servidor local barato evita eso y replica lo que
> verá en producción.

---

## 🖨️ Cómo regenerar el PDF

El PDF en `docs/recircular-onepage.pdf` se genera a partir del sitio
usando Puppeteer + Chromium headless:

```bash
cd tools/puppeteer
npm ci                          # instalar puppeteer + chromium (una sola vez)
node generate-pdf.js            # escribe docs/recircular-onepage.pdf
```

Alternativa con Chrome headless:

```bash
google-chrome --headless \
  --print-to-pdf=docs/recircular-onepage.pdf \
  --no-pagerender-await \
  http://127.0.0.1:8765/index.html
```

---

## 🤝 Cómo contribuir

Lee [`CONTRIBUTING.md`](CONTRIBUTING.md). En resumen:

- **Datos:** ¿Encontraste un número desactualizado o una fuente que
  ya no existe? Usa la plantilla *Corrección de datos* — es la
  contribución más valiosa.
- **Traducciones:** Mejoras de texto en español o inglés.
- **Diseño/UX:** Cambios al sitio web (colores, accesibilidad,
  rendimiento).
- **Investigación:** Análisis, fuentes adicionales, casos
  comparativos.
- **Comentarios generales:** Abre un *issue* normal.

Todos los participantes deben leer y seguir nuestro
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

---

## 📚 Citas y atribuciones

Las fuentes originales (organismos públicos, publicaciones
académicas, informes de la industria) están citadas en
`research/*.md` con su URL y fecha de acceso. Cada cita conserva los
derechos de su titular original; la licencia CC BY 4.0 de este
proyecto aplica a la **compilación, al análisis y a la
presentación**, no a las fuentes citadas.

Para citar este trabajo en una publicación académica o periodística:

> Recircular Puerto Rico — propuesta ciudadana abierta, 2026.
> Disponible en
> https://github.com/chrisdesarden/pr-aluminum-recycling
> Licenciado bajo CC BY 4.0.

---

## 📜 Licencias

- **Código fuente (HTML, CSS, JS, scripts):** [MIT](LICENSE)
- **Datos, investigación, contenido escrito, PDF:**
  [Creative Commons Atribución 4.0 Internacional](LICENSE-DATA)

---

## 📬 Contacto

- **Issues y pull requests:** por este medio, por favor.
- **Email:** ChrisDesarden@users.noreply.github.com
  (usa un *issue* público si el tema no es privado)

---

---

## ✨ Una última palabra

Esto no es un plan del Gobierno. Es una idea ciudadana que se
comparte porque su valor —si lo tiene— aumenta cuando más gente la
lee, la discute y la mejora. Si después de leerla piensas que el
planteamiento es sólido, ayúdanos a difundirla con tu red, con tu
ayuntamiento, con tu senador municipal. Si encuentras un error o un
argumento débil, mejor aún: abre un *issue* y hazlo saber.
