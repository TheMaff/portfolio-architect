import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section aria-labelledby="not-found-title" class="min-h-[75vh] flex items-center justify-center px-6 pt-36 pb-24 bg-brand-dark">
      <div class="max-w-2xl text-center">
        <p class="text-brand-accent text-sm font-semibold uppercase tracking-widest">Error 404</p>
        <h1 id="not-found-title" class="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-white">Esta página no está disponible.</h1>
        <p class="mt-6 text-lg leading-relaxed text-slate-300">El enlace puede haber cambiado. Vuelve al inicio o explora las demos para ver cómo conectar los procesos de tu equipo.</p>
        <div class="mt-9 flex flex-wrap justify-center gap-4">
          <a routerLink="/" class="rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white hover:bg-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">Volver al inicio</a>
          <a routerLink="/" fragment="demos" class="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:border-blue-400 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">Explorar las demos</a>
        </div>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
