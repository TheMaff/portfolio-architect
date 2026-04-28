import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experiencia" class="py-24 bg-brand-dark text-slate-300 relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-8 relative z-10">
        
        <div class="mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Trayectoria <span class="text-brand-accent">Profesional</span>.
          </h2>
          <p class="text-lg text-slate-400">
            Más de una década transformando requerimientos complejos en interfaces escalables. Especialista en modernización de arquitecturas y optimización de performance en entornos enterprise.
          </p>
        </div>

        <div class="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">
          
          <div class="relative pl-8 md:pl-12 group">
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-slate-900 group-hover:bg-brand-accent group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all"></div>
            
            <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 class="text-2xl font-bold text-white">Frontend Architect & Specialist</h3>
              <div class="flex items-center gap-2">
                <span class="text-brand-accent font-medium text-sm md:text-base">Masisa</span>
                <span class="text-slate-500 text-xs">(vía Agencia Jenaro)</span>
              </div>
            </div>
            <time class="block text-sm font-mono text-slate-500 mb-4">Dic 2025 - Presente</time>
            
            <p class="text-slate-400 leading-relaxed mb-4">
              Liderazgo técnico en la optimización de los ecosistemas corporativos (HubSpot CMS) y e-commerce (VTEX IO). Ejecución de auditorías técnicas exhaustivas para reducir el Total Blocking Time (TBT) y el Largest Contentful Paint (LCP) mediante la refactorización de scripts de terceros, carga diferida de assets críticos y mitigación de dependencias bloqueantes (render-blocking).
            </p>
            <ul class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              <li class="px-2 py-1 bg-slate-800/50 border border-blue-900/50 rounded-md">VTEX IO / HubSpot CMS</li>
              <li class="px-2 py-1 bg-slate-800/50 border border-blue-900/50 rounded-md">Core Web Vitals Audit</li>
              <li class="px-2 py-1 bg-slate-800/50 border border-blue-900/50 rounded-md">Technical SEO</li>
            </ul>
          </div>

          <div class="relative pl-8 md:pl-12 group">
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 ring-4 ring-slate-900 group-hover:bg-slate-400 transition-all"></div>
            
            <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 class="text-xl font-bold text-slate-200">Desarrollador Front-end</h3>
              <span class="text-slate-400 font-medium text-sm md:text-base">NTT DATA</span>
            </div>
            <time class="block text-sm font-mono text-slate-500 mb-4">Jun 2022 - Nov 2025</time>
            
            <p class="text-slate-400 leading-relaxed mb-4">
              Desarrollo core en la digitalización integral del sistema de pago de pensiones para AFP Habitat. Trabajo en un equipo internacional de gran escala, construyendo interfaces de alta fluidez conectadas a microservicios en AWS. Foco en la reducción de tiempos de respuesta en flujos transaccionales críticos del sector previsional.
            </p>
            <ul class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">Angular / TypeScript</li>
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">AWS Cloud</li>
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">Sistemas Transaccionales</li>
            </ul>
          </div>

          <div class="relative pl-8 md:pl-12 group">
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 ring-4 ring-slate-900 group-hover:bg-slate-400 transition-all"></div>
            
            <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 class="text-xl font-bold text-slate-200">Desarrollador Front-end</h3>
              <span class="text-slate-400 font-medium text-sm md:text-base">Multiplica</span>
            </div>
            <time class="block text-sm font-mono text-slate-500 mb-4">Oct 2020 - May 2022</time>
            
            <p class="text-slate-400 leading-relaxed mb-4">
              Implementación de arquitectura Headless para la plataforma Idiem (U. de Chile), integrando Angular con Strapi CMS mediante el consumo de APIs REST. Adicionalmente, desarrollo de interfaces y landing pages bajo estrictos estándares de seguridad corporativa para Banco Santander.
            </p>
            <ul class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">Headless CMS (Strapi)</li>
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">REST APIs</li>
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">Entornos Bancarios</li>
            </ul>
          </div>

          <div class="relative pl-8 md:pl-12 group">
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 ring-4 ring-slate-900 group-hover:bg-slate-400 transition-all"></div>
            
            <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 class="text-xl font-bold text-slate-200">Desarrollador Front-end</h3>
              <span class="text-slate-400 font-medium text-sm md:text-base">Cardumen Latam</span>
            </div>
            <time class="block text-sm font-mono text-slate-500 mb-4">Nov 2017 - Mar 2020</time>
            
            <p class="text-slate-400 leading-relaxed mb-4">
              Desarrollo y optimización de plataformas digitales con foco en performance y compatibilidad cross-browser. Liderazgo en estrategias de SEO on-page y arquitectura de la información.
            </p>
            <ul class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">JavaScript</li>
              <li class="px-2 py-1 bg-slate-800/30 border border-slate-800 rounded-md">Technical SEO</li>
            </ul>
          </div>

          <div class="relative pl-8 md:pl-12 pt-6">
             <div class="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-transparent border-2 border-slate-700 ring-4 ring-slate-900"></div>
             <p class="text-sm text-slate-500 italic">
               + Experiencia ininterrumpida desde 2008 en agencias (Media Interactive, 4SALE, Via Magica), sentando bases sólidas en fundamentos de la web (HTML, CSS, UI/UX).
             </p>
             <a href="https://www.linkedin.com/in/maff-dev/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 mt-4 text-sm font-medium text-brand-accent hover:text-blue-400 transition-colors">
               Ver historial completo en LinkedIn <i class="fa-solid fa-arrow-right text-xs"></i>
             </a>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent {}