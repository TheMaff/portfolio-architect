import { Component } from '@angular/core';

@Component({
    selector: 'app-projects',
    standalone: true,
    template: `
    <section id="proyectos" class="py-24 bg-slate-900/20 border-t border-slate-800/50 relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-8 relative z-10">
        
        <div class="mb-16 md:w-2/3">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ecosistema de <span class="text-brand-accent">Proyectos</span>.
          </h2>
          <p class="text-lg text-slate-400">
            De la idea a la producción. Una colección de aplicaciones, plataformas y experimentos donde aplico arquitectura escalable y diseño centrado en el usuario.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          
          <a href="https://mathilearn.vercel.app/" target="_blank" rel="noopener noreferrer" 
             class="group block relative bg-slate-900/80 border border-slate-700 hover:border-brand-accent/50 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 flex flex-col h-full">
            
            <div class="w-full h-48 mb-6 rounded-2xl overflow-hidden relative border border-slate-800">
              <img src="https://mathilearn.vercel.app/img/banner.png" alt="MathiLearn Preview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute top-4 left-4 bg-blue-500/90 text-white backdrop-blur-sm border border-blue-400/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Live
              </div>
            </div>

            <div class="flex-grow">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-xl font-bold text-white">MathiLearn</h3>
                <svg class="w-5 h-5 text-slate-500 group-hover:text-brand-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                Plataforma EdTech interactiva para el aprendizaje de lectoescritura. Implementa mecánicas de Drag & Drop, gamificación y manipulación fonémica.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 mt-auto pt-4 border-t border-slate-800">
              <span class="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700">React</span>
              <span class="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700">Firebase</span>
              <span class="px-2 py-1 bg-slate-800/50 rounded-md border border-slate-700">Chakra UI</span>
            </div>
          </a>

          <div class="relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col h-full select-none">
            <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-3xl z-10"></div>
            
            <div class="relative z-20 opacity-70 grayscale-[50%] flex flex-col h-full">
              <div class="w-full h-48 mb-6 rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-800 flex items-center justify-center">
                <i class="fa-solid fa-code text-4xl text-slate-700"></i>
                <div class="absolute top-4 left-4 bg-orange-500/90 text-white backdrop-blur-sm border border-orange-400/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  WIP
                </div>
              </div>

              <div class="flex-grow">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-xl font-bold text-white">Meal Planner App</h3>
                  <i class="fa-solid fa-person-digging text-slate-500 text-lg"></i>
                </div>
                <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                  Aplicación SaaS para la organización semanal de comidas, generación de listas de compras automatizadas y gestión de inventario en el hogar.
                </p>
              </div>

              <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500 mt-auto pt-4 border-t border-slate-800">
                <span class="px-2 py-1 border border-slate-800 rounded-md">Angular</span>
                <span class="px-2 py-1 border border-slate-800 rounded-md">Node.js</span>
              </div>
            </div>
          </div>

          <div class="relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col h-full select-none">
            <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-3xl z-10"></div>
            
            <div class="relative z-20 opacity-70 grayscale-[50%] flex flex-col h-full">
              <div class="w-full h-48 mb-6 rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-800 flex items-center justify-center">
                <i class="fa-solid fa-palette text-4xl text-slate-700"></i>
                <div class="absolute top-4 left-4 bg-slate-700/90 text-slate-200 backdrop-blur-sm border border-slate-600/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Próximamente
                </div>
              </div>

              <div class="flex-grow">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-xl font-bold text-white">Taller Irma</h3>
                  <i class="fa-regular fa-clock text-slate-500 text-lg"></i>
                </div>
                <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                  Espacio digital interactivo para publicar proyectos artísticos, webcómics, series animadas y contenido multimedia de autoría propia.
                </p>
              </div>

              <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500 mt-auto pt-4 border-t border-slate-800">
                <span class="px-2 py-1 border border-slate-800 rounded-md">Astro</span>
                <span class="px-2 py-1 border border-slate-800 rounded-md">Tailwind</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent { }