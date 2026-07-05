# Guía para contribuir

¡Gracias por tu interés en mejorar **Recircular Puerto Rico**! Este
proyecto es una propuesta ciudadana abierta: su valor depende de que
más personas lo lean, lo cuestionen y lo enriquezcan.

Hay muchas formas útiles de contribuir, y no necesitas saber
programar para participar.

---

## 🐞 ¿Encontraste algo que se puede mejorar?

Abre un *issue* usando la plantilla que mejor encaje:

- **Corrección de datos** — la forma más valiosa de contribuir.
  ¿Una fuente desactualizada? ¿Una cifra que ya no aplica? ¿Una URL
  rota en los documentos de investigación?
- **Reporte de error (bug)** — algo se rompe, no se ve bien, o no
  funciona como debería en el sitio.
- **Solicitud de funcionalidad** — una mejora al sitio, al PDF, o a
  la documentación.
- **Discusión general** — para preguntas, ideas, o comentarios
  abiertos.

---

## 📊 Corrección de datos (la contribución más valiosa)

La propuesta descansa sobre cifras: tasas de reciclaje, costos de
capital, retorno, empleo, cifras de generación de residuos, etc. Si
ves algo que:

- No coincide con la fuente citada
- Está desactualizado
- Te parece cuestionable con evidencia

…por favor usa la plantilla **Corrección de datos**. Incluye:

1. **La cifra exacta** que se ve en el sitio o en `research/*.md`
2. **La fuente** que la contradice (URL + fecha de acceso)
3. **El valor propuesto** y por qué

La información se verifica contra la fuente y, si procede, se
actualiza tanto el sitio como el documento de investigación, y se
regenera el PDF.

---

## 🌐 Traducciones (ES / EN)

El sitio es bilingüe. Las cadenas viven en
`site/assets/translations.json` (325 claves en cada idioma).

Si encuentras:

- Una traducción torpe o incorrecta
- Un texto en español que falta en inglés (o viceversa)
- Un término técnico que podría unificarse

Abre un *issue* con la etiqueta `i18n` indicando:

1. La clave (por ejemplo: `hero_lede`)
2. El texto actual en ambos idiomas
3. Tu propuesta

**Reglas de oro para traducciones:**

- **Mantén los números y nombres propios sin traducir.**
- **Tono:** llano y directo, sin jerga. La audiencia es gente
  curiosa, no especialista.
- **Coherencia terminológica:** si introduces un término nuevo,
  úsalo consistentemente en todo el archivo.

---

## 💻 Cambios al sitio web

El sitio es HTML + CSS + JS sin frameworks. Para proposing cambios:

1. **Bifurca** (*fork*) el repositorio.
2. Crea una rama descriptiva:
   `git checkout -b fix/donut-stroke-bug` o
   `feat/iphone-breakpoint`.
3. Haz los cambios localmente. Para probarlos:
   ```bash
   cd site
   python3 -m http.server 8765
   # abre http://127.0.0.1:8765
   ```
4. **Verifica** que:
   - No hay errores en la consola del navegador
   - Funciona en modo claro y oscuro
   - Es legible en móvil (prueba con DevTools en 375 px de ancho)
   - Si tocaste un número, lo actualizaste también en
     `research/*.md` y regeneraste el PDF
5. Abre un *Pull Request* describiendo el cambio y adjunta una
   captura de pantalla si es visual.

---

## 📚 Cambios a la investigación

Los documentos en `research/` son la columna vertebral de la
propuesta. Si encuentras:

- Un error de hecho
- Una fuente mejor disponible
- Un argumento que se puede reforzar con datos adicionales

Abre un *issue* o un *Pull Request* directamente sobre el archivo
`.md` correspondiente. Las fuentes se citan en formato:

```
> [Título de la fuente](URL) — fecha de acceso
```

Por favor **no elimines fuentes existentes** sin una discusión
previa en un *issue*; si crees que una fuente es incorrecta,
plantéalo primero.

---

## 🤝 Código de conducta

Toda participación —en *issues*, *pull requests*, o
comentarios— está sujeta a nuestro
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Léelo antes de
participar. En resumen: **sé respetuoso, asume buena fe, y
argumenta sobre las ideas, no sobre las personas**.

---

## 🔍 Revisión de Pull Requests

- Las revisiones las hacen mantenedores voluntarios. Sé paciente.
- Si tu *PR* lleva más de dos semanas sin respuesta, envíale un
  recordatorio amable a quien abrió la revisión.
- Las decisiones de diseño se toman por consenso cuando es
  posible; cuando no, decide quien mantiene el proyecto,
  documentando la razón.

---

## ❓ ¿Duda rápida que no amerita un *issue*?

- **Email:** ChrisDesarden@users.noreply.github.com (usar para
  temas privados; para discusiones técnicas, abrir un *issue*
  público es preferible).

---

## 🙏 Gracias

Cada corrección, por pequeña que sea, hace la propuesta más
sólida. Esto es trabajo voluntario y abierto — tu tiempo es el
regalo.
