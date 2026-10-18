import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="inicio" aria-labelledby="hero-title" class="min-h-screen flex items-center justify-center bg-brand-dark text-white px-6 pt-36 pb-24 sm:px-8">
      <div class="max-w-5xl text-center">
        <p class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-xs sm:text-sm font-medium text-slate-300 mb-8">
          <span class="w-2 h-2 shrink-0 rounded-full bg-brand-accent" aria-hidden="true"></span>
          Automatización · CRM · Integraciones · Dashboards
        </p>
        <h1 id="hero-title" class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Menos tareas manuales.
          <span class="block text-brand-accent">Más tiempo para tu negocio.</span>
        </h1>
        <p class="text-lg sm:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          Conecto tus herramientas, organizo tu seguimiento comercial y transformo tus datos en información útil para decidir. Soluciones pensadas para la forma en que trabaja tu equipo.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contacto" class="bg-blue-600 px-7 py-3.5 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
            Conversemos sobre tu proceso
          </a>
          <a routerLink="/demos/seguimiento-comercial" class="border border-slate-600 px-7 py-3.5 rounded-full font-medium hover:border-slate-400 hover:bg-slate-800/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
            Probar demo comercial
          </a>
        </div>
        <p class="mt-6 text-sm text-slate-400">Empecemos por el proceso que hoy te quita más tiempo.</p>
      </div>
    </section>
  `
})
export class HeroComponent {}
