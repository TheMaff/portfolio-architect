import { Component } from '@angular/core';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  template: `
    <section id="soluciones" aria-labelledby="solutions-title" class="py-24 scroll-mt-20 bg-brand-dark text-slate-300 relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true"></div>
      <div class="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div class="mb-12 max-w-3xl">
          <p class="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-4">Soluciones para tu equipo</p>
          <h2 id="solutions-title" class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Herramientas conectadas.<br />
            <span class="text-brand-accent">Procesos más simples.</span>
          </h2>
          <p class="text-lg text-slate-400 leading-relaxed">
            Partimos de una necesidad concreta y definimos qué conviene automatizar, integrar o visualizar. Estos son algunos procesos en los que podemos trabajar.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          @for (solution of solutions; track solution.title) {
            <article class="group flex flex-col bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-7 sm:p-9 transition-colors">
              <div class="w-12 h-12 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl mb-6">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="solution.icon" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3">{{ solution.title }}</h3>
              <p class="text-slate-400 leading-relaxed mb-6">{{ solution.description }}</p>
              <ul class="space-y-3 text-sm text-slate-300 mb-8">
                @for (example of solution.examples; track example) {
                  <li class="flex items-start gap-3">
                    <span class="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-accent mt-2" aria-hidden="true"></span>
                    {{ example }}
                  </li>
                }
              </ul>
              <a href="#contacto" class="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
                {{ solution.cta }}
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </a>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class CaseStudiesComponent {
  readonly solutions = [
    {
      title: 'Automatización de procesos',
      description: 'Libera a tu equipo de pasos repetitivos y mantén el seguimiento de lo que ocurre en cada flujo.',
      examples: [
        'Asignación de consultas al responsable correcto',
        'Recordatorios y actualizaciones de estado',
        'Alertas cuando un proceso necesita atención'
      ],
      cta: 'Hablemos de tu proceso',
      icon: 'm13 2-3 8H4l7 12 3-8h6L13 2Z'
    },
    {
      title: 'CRM y seguimiento comercial',
      description: 'Organiza contactos, oportunidades y próximas acciones para dar continuidad a cada conversación comercial.',
      examples: [
        'Formularios conectados al CRM',
        'Etapas de venta adaptadas a tu equipo',
        'Tareas y seguimiento de oportunidades'
      ],
      cta: 'Revisemos tu seguimiento comercial',
      icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
    },
    {
      title: 'Integraciones entre herramientas',
      description: 'Conecta los sistemas que ya usas para evitar copiar información a mano y mantener tus datos alineados.',
      examples: [
        'Conexión de formularios, CRM y hojas de cálculo',
        'Intercambio de datos mediante APIs y webhooks',
        'Validación de datos y registro de errores'
      ],
      cta: 'Conversemos sobre tus herramientas',
      icon: 'M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 2.93L11.28 4.64m1.72 5.36a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 10 20.07l1.71-1.71'
    },
    {
      title: 'Dashboards para decidir',
      description: 'Reúne los indicadores de tu operación en una vista clara para detectar pendientes y tomar decisiones con contexto.',
      examples: [
        'Visibilidad del pipeline y sus oportunidades',
        'Indicadores de ventas y operación',
        'Filtros por período, equipo o estado'
      ],
      cta: 'Definamos tus indicadores',
      icon: 'M3 3v18h18M8 16v-4m5 4V8m5 8V5'
    }
  ] as const;
}
