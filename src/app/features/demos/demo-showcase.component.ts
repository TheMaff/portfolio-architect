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
          <h2 id="demo-showcase-title" class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">Del primer contacto a una visión clara de tu negocio.</h2>
          <p class="text-slate-300 text-lg leading-relaxed">Explora dos ejemplos de cómo organizar el trabajo comercial y convertir tus datos en información útil para decidir.</p>
          <p class="text-sm text-blue-200 mt-5">Datos ficticios · Sin registro · Puedes volver a empezar cuando quieras</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-6 items-stretch">
          <article aria-labelledby="capture-demo-heading" class="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-7 sm:p-9">
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
            <a routerLink="/demos/seguimiento-comercial" class="mt-auto inline-flex self-start items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors">Probar demo comercial <span aria-hidden="true">→</span></a>
          </article>
          <article aria-labelledby="dashboard-demo-heading" class="flex flex-col rounded-3xl border border-slate-700 bg-slate-900/60 p-7 sm:p-9">
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
            <a routerLink="/demos/dashboard-comercial" class="mt-auto inline-flex self-start items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors">Probar dashboard comercial <span aria-hidden="true">→</span></a>
          </article>
        </div>
        <p class="text-sm text-slate-400 mt-6">Son simulaciones independientes. No se conectan a un CRM ni envían mensajes; los datos de una demo no se trasladan a la otra.</p>
      </div>
    </section>
  `
})
export class DemoShowcaseComponent {}
