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

## Lighthouse

La sección de calidad muestra una **auditoría histórica**, no una medición de esta actualización: escritorio, 28 de abril de 2026, resultados 100 / 95 / 100 / 100. El archivo original está en `public/assets/themaff.netlify.app-20260428T160031.json` y se copia sin cambios al publicar.

El componente anterior `DevScoreComponent` ya no se monta en la portada. La evidencia histórica queda en una sección secundaria. Para publicar una auditoría nueva hay que ejecutar Lighthouse sobre el despliegue correspondiente y actualizar juntos fecha, entorno, valores y reporte.

## Publicación

Trabaja mediante ramas y revisión previa. Conecta el repositorio al proyecto Netlify y verifica que la rama de producción sea la prevista. El comando y directorio de publicación están versionados; habilitar Forms y sus notificaciones se realiza en la configuración del proyecto.

La portada conserva su estética original. Las dos demos tienen rutas propias con carga diferida y acceso desde la sección Demos. También hay enlaces para pasar de una demo a la otra.

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
