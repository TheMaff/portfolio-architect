import { Component } from '@angular/core';

@Component({
  selector: 'app-quality',
  standalone: true,
  template: `
    <section aria-labelledby="quality-heading" class="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 id="quality-heading" class="text-lg font-semibold text-white">Auditoría de referencia</h2>
            <p class="text-sm text-slate-400 mt-1">
              Lighthouse · Escritorio · <time datetime="2026-04-28">28 de abril de 2026</time>
            </p>
          </div>
          <a
            href="/assets/themaff.netlify.app-20260428T160031.json"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            Consultar reporte Lighthouse (JSON)
            <span class="sr-only">, se abre en otra pestaña</span>
            <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 3h6v6m0-6-9 9M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
            </svg>
          </a>
        </div>

        <dl class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="rounded-2xl bg-slate-800/40 p-4">
            <dt class="text-sm text-slate-300">Rendimiento</dt>
            <dd class="mt-1 text-2xl font-semibold text-white">100<span class="text-sm font-normal text-slate-400"> / 100</span></dd>
          </div>
          <div class="rounded-2xl bg-slate-800/40 p-4">
            <dt class="text-sm text-slate-300">Accesibilidad</dt>
            <dd class="mt-1 text-2xl font-semibold text-white">95<span class="text-sm font-normal text-slate-400"> / 100</span></dd>
          </div>
          <div class="rounded-2xl bg-slate-800/40 p-4">
            <dt class="text-sm text-slate-300">Buenas prácticas</dt>
            <dd class="mt-1 text-2xl font-semibold text-white">100<span class="text-sm font-normal text-slate-400"> / 100</span></dd>
          </div>
          <div class="rounded-2xl bg-slate-800/40 p-4">
            <dt class="text-sm text-slate-300">SEO</dt>
            <dd class="mt-1 text-2xl font-semibold text-white">100<span class="text-sm font-normal text-slate-400"> / 100</span></dd>
          </div>
        </dl>

        <p class="text-sm text-slate-400 mt-5 leading-relaxed">
          Estos resultados corresponden a una versión anterior del sitio y no describen el rendimiento de esta actualización.
        </p>
      </div>
    </section>
  `
})
export class QualityComponent {}
