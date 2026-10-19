import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-showcase',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="demos" aria-labelledby="demo-showcase-title" class="py-20 md:py-24 bg-slate-900/30 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <div class="max-w-3xl mb-10">
          <p class="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Pruébalo en una demo</p>
          <h2 id="demo-showcase-title" class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">Procesos conectados. Información para decidir.</h2>
          <p class="text-slate-300 text-lg leading-relaxed">Explora tres ejemplos de cómo organizar el seguimiento comercial, entender tus resultados y conectar las herramientas de tu equipo.</p>
          <p class="text-sm text-blue-200 mt-5">Datos ficticios · Sin registro · Puedes volver a empezar cuando quieras</p>
        </div>
        <div class="grid lg:grid-cols-3 gap-6 items-stretch">
          <article aria-labelledby="capture-demo-heading" class="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-7 lg:p-6">
            <div class="flex items-center justify-between gap-4 mb-7">
              <span class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-300" aria-hidden="true"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5h5v5H4zM15 5h5v5h-5zM4 14h5v5H4zM15 14h5v5h-5zM9 7.5h6M6.5 10v4M17.5 10v4"/></svg></span>
              <span class="text-xs text-slate-400 font-medium">01 · Captación y seguimiento</span>
            </div>
            <h3 id="capture-demo-heading" class="text-2xl font-semibold text-white tracking-tight mb-4">Cada consulta, con un siguiente paso.</h3>
            <p class="text-slate-300 leading-relaxed mb-6">Simula la llegada de un contacto y acompaña una oportunidad por sus etapas de venta, sin perder el hilo de la conversación.</p>
            <ul class="space-y-3 text-sm text-slate-400 mb-8">
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Detecta correos duplicados.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Asigna responsable y próxima tarea.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Revisa el tablero y el historial.</li>
            </ul>
            <a routerLink="/demos/seguimiento-comercial" class="mt-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-sm text-center font-semibold px-5 py-3.5 rounded-full transition-colors">Probar demo comercial <span aria-hidden="true">→</span></a>
          </article>
          <article aria-labelledby="dashboard-demo-heading" class="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-7 lg:p-6">
            <div class="flex items-center justify-between gap-4 mb-7">
              <span class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-300" aria-hidden="true"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v16h16M8 16v-5M12 16V7M16 16v-8M20 16v-3"/></svg></span>
              <span class="text-xs text-slate-400 font-medium">02 · Dashboard comercial</span>
            </div>
            <h3 id="dashboard-demo-heading" class="text-2xl font-semibold text-white tracking-tight mb-4">Tus oportunidades, desde otra perspectiva.</h3>
            <p class="text-slate-300 leading-relaxed mb-6">Explora un dashboard para entender el valor ganado, el pipeline abierto y los resultados de un equipo comercial ficticio.</p>
            <ul class="space-y-3 text-sm text-slate-400 mb-8">
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Filtra por período, responsable y canal.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Compara gráficos e indicadores conectados.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Consulta las oportunidades detrás de cada cifra.</li>
            </ul>
            <a routerLink="/demos/dashboard-comercial" class="mt-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-sm text-center font-semibold px-5 py-3.5 rounded-full transition-colors">Probar dashboard comercial <span aria-hidden="true">→</span></a>
          </article>
          <article aria-labelledby="integration-demo-heading" class="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-6 sm:p-7 lg:p-6">
            <div class="flex items-center justify-between gap-4 mb-7">
              <span class="inline-flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 text-blue-300" aria-hidden="true"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10M7 17h10M7 7v10M17 7v10"/><rect x="3" y="3" width="8" height="6" rx="2"/><rect x="13" y="15" width="8" height="6" rx="2"/></svg></span>
              <span class="text-xs text-slate-400 font-medium">03 · Integración entre herramientas</span>
            </div>
            <h3 id="integration-demo-heading" class="text-2xl font-semibold text-white tracking-tight mb-4">La misma consulta, en cada herramienta.</h3>
            <p class="text-slate-300 leading-relaxed mb-6">Sigue el recorrido de un formulario al CRM y a una hoja de cálculo. Comprueba qué datos llegan a cada destino y qué pasa si un paso falla.</p>
            <ul class="space-y-3 text-sm text-slate-400 mb-8">
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Valida y organiza la consulta.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Crea o actualiza el contacto y su fila.</li>
              <li class="flex gap-3"><span class="text-blue-300" aria-hidden="true">→</span> Simula errores y reintenta sin duplicar.</li>
            </ul>
            <a routerLink="/demos/formulario-crm-hoja" class="mt-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-sm text-center font-semibold px-5 py-3.5 rounded-full transition-colors">Probar integración <span aria-hidden="true">→</span></a>
          </article>
        </div>
        <p class="text-sm text-slate-400 mt-6">Son simulaciones independientes. No se conectan a un CRM ni envían mensajes; los datos de una demo no se trasladan a la otra.</p>
      </div>
    </section>
  `
})
export class DemoShowcaseComponent {}
