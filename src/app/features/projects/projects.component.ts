import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section id="proyectos" aria-labelledby="projects-title" class="py-12 bg-brand-dark">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <details class="group rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <summary class="cursor-pointer text-slate-300 font-medium rounded-lg">
            <span id="projects-title">Otros proyectos: producto e interacción</span>
          </summary>
          <div class="mt-6 md:flex md:items-center md:justify-between gap-8 border-t border-slate-800 pt-6">
            <div class="max-w-2xl">
              <h2 class="text-xl font-bold text-white mb-3">MathiLearn</h2>
              <p class="text-slate-300 leading-relaxed">Proyecto educativo de lectoescritura con actividades interactivas y gamificación. Una muestra de desarrollo de producto, complementaria a los servicios para empresas.</p>
              <p class="text-sm text-slate-400 mt-3">React · Firebase · Chakra UI</p>
            </div>
            <a href="https://mathilearn.vercel.app/" target="_blank" rel="noopener noreferrer" class="inline-flex shrink-0 items-center gap-2 mt-6 md:mt-0 text-blue-300 hover:text-blue-200 font-medium rounded-lg">
              Visitar MathiLearn <span class="sr-only">(abre en otra pestaña)</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </details>
      </div>
    </section>
  `
})
export class ProjectsComponent {}
