import { Component } from '@angular/core';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  template: `
    <section class="py-24 bg-brand-dark text-slate-300 relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="max-w-6xl mx-auto px-8 relative z-10">
        <div class="mb-16 md:w-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ecosistemas complejos, <br/>
            <span class="text-brand-accent text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-accent">
              soluciones elegantes.
            </span>
          </h2>
          <p class="text-lg text-slate-400">
            Mi especialidad no es hacer landing pages; es rescatar y escalar plataformas enterprise B2B/B2C que mueven la aguja del negocio.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          
          <div class="group relative bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20">
            <div class="flex justify-between items-start mb-8">
              <div class="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">VTEX IO</div>
              <svg class="w-8 h-8 text-slate-600 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Arquitectura Store Framework</h3>
            <p class="text-slate-400 mb-6 leading-relaxed">
              Gestión y optimización de tiendas a gran escala. Experiencia comprobada orquestando manifiestos con más de 60 dependencias críticas (como integraciones Mudi, cotizadores y motores de precios) asegurando cero downtime y LCP óptimo.
            </p>
            <ul class="space-y-2 text-sm text-slate-500 font-mono">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> React & TypeScript estricto</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Estabilización de dependencias beta</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Workspaces CI/CD</li>
            </ul>
          </div>

          <div class="group relative bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/20">
            <div class="flex justify-between items-start mb-8">
              <div class="flex gap-2">
                <div class="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">HubSpot CMS</div>
                <div class="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Strapi</div>
              </div>
              <svg class="w-8 h-8 text-slate-600 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Ingeniería de Temas & Composable</h3>
            <p class="text-slate-400 mb-6 leading-relaxed">
              Desarrollo de temas modulares y escalables (Child Themes) evitando la sobrescritura destructiva. Integración fluida de ecosistemas Headless mediante APIs REST/GraphQL para servir contenido dinámico y ultra-rápido.
            </p>
            <ul class="space-y-2 text-sm text-slate-500 font-mono">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> CLI Automation & HubL</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Arquitectura BEM / Tailwind</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Headless Content Delivery</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  `
})
export class CaseStudiesComponent {}