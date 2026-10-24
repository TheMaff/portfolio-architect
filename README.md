# The Maff

Sitio de servicios B2B de Marcos Flores: automatización de procesos, CRM, integraciones y dashboards.

## Desarrollo

Angular 19.2, TypeScript y Tailwind CSS. Usa Node.js 22.

```sh
npm ci
npm start
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

La compilación publica archivos estáticos en `dist/me-pro-portfolio/browser`. La configuración está en `netlify.toml`. La actualización de Angular corresponde a una etapa posterior. La portada y las demos se cargan en rutas independientes.

## Contacto y recepción de consultas

El formulario usa Netlify Forms, sin claves en el cliente. `public/contact-form.html` registra el formulario en el HTML de compilación para que Netlify pueda detectarlo. Su nombre (`b2b-contact`) y campos deben coincidir con `ContactComponent`: `form-name`, `bot-field`, `name`, `email`, `company`, `service`, `process` y `tools`.

Para habilitar la recepción en el proyecto de Netlify:

1. En **Forms**, habilita **Enable form detection** si está desactivado.
2. Despliega esta versión y confirma que aparece **b2b-contact** en Forms.
3. En **Forms → Submission notifications**, configura una notificación al correo deseado si quieres recibir avisos. Guardar una consulta en Forms no configura un aviso por correo automáticamente.
4. Revisa el envío de una consulta de prueba autorizada: recepción en Forms, notificación y respuesta en pantalla. Las pruebas de este repositorio usan respuestas simuladas y no envían consultas reales.

Antes de enviar datos, la aplicación comprueba que Netlify haya procesado la definición estática. Si la recepción no está preparada o la solicitud falla, conserva el texto y ofrece el correo directo. En localhost solo valida los campos y explica que es una vista previa; nunca informa que se haya enviado una consulta.

La protección de spam usa el campo honeypot de Netlify. No se guardan datos de contacto en el almacenamiento del navegador.

Documentación oficial: [configurar Forms](https://docs.netlify.com/manage/forms/setup/) y [notificaciones](https://docs.netlify.com/manage/forms/notifications/).

## SEO y medición

La compilación genera HTML estático para la portada, las tres demos y `/404`, con hidratación de Angular para conservar las interacciones. Cada página pública tiene título, descripción, canonical, Open Graph y datos estructurados propios. `public/sitemap.xml` contiene las cuatro URLs públicas y `public/robots.txt` anuncia el sitemap. Netlify devuelve un HTTP 404 real para direcciones inexistentes.

El favicon usa la M de The Maff en SVG, ICO y PNG; la imagen social está en `public/assets/the-maff-social.png`.

GA4 usa el flujo **The Maff · Web** (`G-FT16BY0XDX`), propiedad **The Maff · Sitio web** (`560552110`), en la cuenta existente de Marcos. `src/app/shared/analytics/measurement-id.ts` guarda el identificador público, que no es una clave privada. No requiere Netlify Analytics ni un plan de pago.

- La etiqueta solo se carga en `themaff.netlify.app`, nunca en localhost o deploy previews.
- `page_view` cuenta cambios entre las cuatro páginas públicas; saltos a secciones y cambios de filtros no suman otra visita.
- `demo_view` identifica qué demo se abrió. `generate_lead` solo se emite después de que Netlify acepte una consulta real.
- No se envían valores del formulario, parámetros de URL ni fragmentos. La medición mejorada de GA4 está desactivada para evitar eventos de formularios o visitas duplicadas por cambios de historial.

Para verificar la instalación tras publicar, abre el sitio y una demo y comprueba sus eventos en **Analytics → Tiempo real**. Una prueba de conversión necesita un envío real autorizado y debe comprobarse también en Netlify Forms. El código no recupera visitas anteriores a la instalación.

Search Console usa la propiedad de prefijo `https://themaff.netlify.app/` y la etiqueta `google-site-verification` en `src/index.html`. La verificación y el envío de `https://themaff.netlify.app/sitemap.xml` se completan sobre producción, después de publicar; una vista previa no verifica la propiedad de esa URL. Conserva la etiqueta para mantener la verificación.

## Lighthouse

La sección de calidad muestra una **auditoría histórica**, no una medición de esta actualización: escritorio, 28 de abril de 2026, resultados 100 / 95 / 100 / 100. El archivo original está en `public/assets/themaff.netlify.app-20260428T160031.json` y se copia sin cambios al publicar.

El componente anterior `DevScoreComponent` ya no se monta en la portada. La evidencia histórica queda en una sección secundaria. Para publicar una auditoría nueva hay que ejecutar Lighthouse sobre el despliegue correspondiente y actualizar juntos fecha, entorno, valores y reporte.

## Publicación

Trabaja mediante ramas y revisión previa. Conecta el repositorio al proyecto Netlify y verifica que la rama de producción sea la prevista. El comando y directorio de publicación están versionados; habilitar Forms y sus notificaciones se realiza en la configuración del proyecto.

La portada conserva su estética original. Las tres demos tienen rutas propias con carga diferida y acceso desde la sección Demos. Cada demo utiliza datos independientes y permite volver a la portada o al contacto real.

## Demo de captación y seguimiento comercial

Ruta: `/demos/seguimiento-comercial`. La sección `/#demos` y el botón de la portada permiten abrirla sin registro.

La demo funciona con datos sintéticos en memoria. No usa Netlify Forms, no envía correos, no llama a APIs y no guarda información en el almacenamiento del navegador. Al recargar, salir y volver a entrar, o reiniciar, se recuperan los ejemplos iniciales.

Recorrido para probar:

1. Cargar el ejemplo nuevo y simular su captación. Comprobar que aparece en **Nuevo**, con responsable, próxima acción e historial.
2. Cargar el ejemplo de duplicado y simular la consulta. El correo se compara sin espacios externos y sin distinguir mayúsculas: se añade la consulta al historial de la oportunidad existente, sin duplicar el contacto ni cambiar su etapa o responsable.
3. Seleccionar una oportunidad y avanzar por **Nuevo → Contactado → Propuesta → Ganado**. Revisar la próxima acción y el historial en cada paso.
4. Reiniciar y confirmar que se restablecen los ejemplos y el formulario.

Las cifras del tablero son conteos de los datos ficticios, no resultados comerciales reales. El botón de contacto de la demo vuelve al formulario real de The Maff; no copia ni envía los datos de ejemplo.

El shell compartido conserva cabecera, pie y enlace para saltar al contenido. Las anclas del menú llevan a la portada desde cualquier ruta. La regla Netlify limitada a `/demos/*` permite abrir o recargar la URL de la demo sin afectar `/contact-form.html`, los activos ni el POST del contacto real.

## Demo de dashboard comercial

Ruta: `/demos/dashboard-comercial`. Usa un conjunto fijo de oportunidades sintéticas de enero a junio de 2026, con importes enteros en pesos chilenos (CLP). Es independiente de la primera demo y no representa resultados de The Maff ni de sus clientes.

Los filtros se combinan por **fecha de entrada**, responsable y canal. Indicadores, gráficos y tabla usan las mismas oportunidades filtradas:

- **Valor ganado:** suma del importe de las oportunidades ganadas de ese conjunto; no es facturación cobrada.
- **Pipeline abierto:** suma del importe en Nuevo, Contactado y Propuesta; no es una previsión ponderada.
- **Tasa de cierre:** ganadas / (ganadas + perdidas). Sin oportunidades cerradas se muestra sin dato, en lugar de un porcentaje inventado.
- **Valor ganado por mes de entrada:** agrupa las ganadas según su fecha de entrada; no mide el mes del cierre.

Recorrido para probar:

1. Revisar el semestre completo y la explicación de los indicadores.
2. Cambiar el período de entrada, el responsable y el canal; comprobar cómo cambian juntos las cifras, gráficos y oportunidades.
3. Abrir el detalle de una oportunidad para ver su contexto y próxima acción.
4. Probar una combinación sin resultados y restablecer los filtros.
5. Pasar a la demo de captación o volver al contacto real desde el CTA.

Los gráficos incluyen valores textuales y los datos están disponibles en la tabla. No se añaden librerías de gráficos. El dashboard no hace solicitudes, no envía formularios ni guarda filtros o datos en el navegador; al volver a entrar se recupera la vista inicial.

## Demo de integración: formulario, CRM y hoja

Ruta: `/demos/formulario-crm-hoja`. Es una simulación en memoria, con contactos ficticios y registros iniciales independientes de las otras demos. No se conecta a un CRM ni a Google Sheets, no requiere credenciales y no usa Netlify Forms.

El formulario recoge nombre, correo, empresa opcional y servicio. Normaliza espacios y correo en minúsculas antes de validar. El correo identifica el contacto en el CRM simulado; su ID identifica la fila de la hoja. Al repetir una consulta, se actualizan los datos sin duplicar registros y se conserva el responsable y la etapa comercial existentes. La hoja recibe los datos del contacto guardado en el CRM.

Tres escenarios permiten explorar el flujo:

- **Completo:** valida la consulta, crea o actualiza el contacto y crea o actualiza su fila.
- **Fallo del CRM:** no cambia ningún destino. El reintento continúa con la consulta original.
- **Fallo de la hoja:** el CRM conserva el contacto guardado y la hoja queda pendiente. El reintento procesa solo la hoja y reutiliza el mismo ID de contacto.

Los errores son temporales y simulados; el reintento resuelve el paso pendiente. El identificador de ejecución y su consulta original se mantienen, aunque se editen los campos del formulario. Mientras existe un fallo pendiente, se debe reintentar o restablecer la demo antes de iniciar otra ejecución. Reintentar una ejecución ya completada no genera cambios.

Recorrido para probar:

1. Cargar el ejemplo nuevo y simular la integración completa. Revisar los estados, el contacto en el CRM y la fila con el mismo ID.
2. Volver a enviar el mismo correo y comprobar que se actualizan los datos sin aumentar los registros.
3. Cargar el ejemplo existente y confirmar que conserva responsable y etapa.
4. Simular un fallo del CRM y reintentar. Después probar un fallo de la hoja y confirmar que el reintento no duplica el contacto.
5. Restablecer o recargar para recuperar el escenario inicial.

El historial muestra qué pasó en cada paso, incluidos los errores y reintentos. Nada se envía ni se almacena fuera de la sesión de la demo. El botón de contacto vuelve al formulario real sin copiar datos ficticios.
