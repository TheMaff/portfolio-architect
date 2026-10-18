import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  standalone: true,
  template: `
    <section id="proceso" aria-labelledby="process-title" class="py-20 md:py-24 border-y border-slate-800/60 bg-slate-900/20">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <div class="max-w-3xl mb-12">
          <p class="text-sm font-semibold tracking-widest uppercase text-brand-accent mb-4">Cómo trabajamos</p>
          <h2 id="process-title" class="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5">Un proceso claro, desde la primera conversación.</h2>
          <p class="text-lg text-slate-300 leading-relaxed">Empezamos por una necesidad concreta de tu equipo y acordamos qué resolver primero, cómo validarlo y qué necesitas para operarlo.</p>
        </div>
        <ol class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (step of steps; track step.title; let index = $index) {
            <li class="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
              <span class="inline-flex items-center justify-center rounded-full w-10 h-10 bg-blue-500/10 text-blue-300 border border-blue-500/30 font-mono text-sm mb-6" aria-hidden="true">0{{ index + 1 }}</span>
              <h3 class="text-lg font-semibold text-white mb-3">{{ step.title }}</h3>
              <p class="text-sm leading-relaxed text-slate-300">{{ step.description }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `
})
export class ProcessComponent {
  readonly steps = [
    { title: 'Entendemos el proceso', description: 'Revisamos las tareas manuales, las herramientas que usas y dónde se pierde información o tiempo.' },
    { title: 'Definimos el alcance', description: 'Acordamos una primera solución, sus entregables y los criterios para saber si cumple su objetivo.' },
    { title: 'Construimos y validamos', description: 'Probamos el flujo contigo, incluidos los errores y excepciones que tu equipo encuentra en el día a día.' },
    { title: 'Dejamos todo claro', description: 'Entregamos documentación y revisamos el uso de la solución. Acordamos el soporte y los siguientes pasos que necesites.' }
  ];
}
