import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    template: `
    <section class="min-h-screen flex items-center justify-center bg-brand-dark text-white p-8">
      <div class="max-w-4xl text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-300 mb-8">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Hola, soy Frontend Architect
        </div>

        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Arquitectura Frontend que <span class="text-brand-accent">escala</span>.
        </h1>

        <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Especialista en optimización de performance y diseño de sistemas complejos para VTEX, HubSpot y arquitecturas Headless.
        </p>
        
        <div class="flex gap-4 justify-center">
          <a href="#proyectos" class="bg-brand-accent px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
            Ver Proyectos
          </a>
          <button class="bg-transparent border border-slate-600 px-8 py-3 rounded-full font-medium hover:border-slate-400 transition">
            Descargar One-Pager
          </button>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
    isLoaded = signal(true);
}