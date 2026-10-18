import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo-showcase',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="demos" aria-labelledby="demo-showcase-title" class="py-20 md:py-24 bg-slate-900/30 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <p class="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Pruébalo en una demo</p>
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-3xl border border-slate-700 bg-slate-900/60 p-7 sm:p-10">
          <div>
            <h2 id="demo-showcase-title" class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">De una consulta a una oportunidad con seguimiento.</h2>
            <p class="text-slate-300 text-lg leading-relaxed mb-6">Simula la llegada de un contacto, descubre cómo evitar duplicados y avanza una oportunidad por sus etapas de venta. Siempre con responsable y próxima acción.</p>
            <p class="text-sm text-blue-200 mb-7">Datos ficticios · Sin registro · Puedes reiniciar cuando quieras</p>
            <a routerLink="/demos/seguimiento-comercial" class="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-full transition-colors">
              Probar demo comercial <span aria-hidden="true">→</span>
            </a>
          </div>
          <div class="rounded-2xl border border-slate-700 bg-slate-950/50 p-6 sm:p-8">
            <h3 class="font-semibold text-white mb-5">Explora el recorrido completo</h3>
            <ol class="space-y-5 text-slate-300">
              <li class="flex gap-4"><span class="shrink-0 font-mono text-blue-300" aria-hidden="true">01</span><span><strong class="text-white font-medium">Captar.</strong> Un formulario convierte una consulta en un contacto organizado.</span></li>
              <li class="flex gap-4"><span class="shrink-0 font-mono text-blue-300" aria-hidden="true">02</span><span><strong class="text-white font-medium">Asignar.</strong> Cada oportunidad tiene un responsable y una siguiente tarea.</span></li>
              <li class="flex gap-4"><span class="shrink-0 font-mono text-blue-300" aria-hidden="true">03</span><span><strong class="text-white font-medium">Dar seguimiento.</strong> El tablero y el historial muestran cómo avanza la conversación.</span></li>
            </ol>
            <p class="text-sm text-slate-400 mt-6 border-t border-slate-800 pt-5">Es una simulación: no envía mensajes ni crea contactos en un CRM real.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DemoShowcaseComponent {}
