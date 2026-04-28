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

          <div class="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col h-full select-none hover:border-orange-500/30 transition-colors duration-300">
            <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-3xl z-10 group-hover:backdrop-blur-none transition-all duration-500"></div>
            
            <div class="relative z-20 opacity-70 grayscale-[50%] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 flex flex-col h-full">
              
              <div class="w-full h-48 mb-6 rounded-2xl relative border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#475569 1px, transparent 1px); background-size: 16px 16px;"></div>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" class="w-auto h-16 text-slate-700 group-hover:text-orange-400 transition-colors duration-500 relative z-10 drop-shadow-md" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 35,15 H 20 V 65 H 35" stroke-width="4" class="opacity-30 group-hover:opacity-60 transition-opacity" />
                  <path d="M 50,60 V 25 L 65,40 L 80,25 V 60" />
                  <path d="M 95,60 L 105,25 L 115,60 M 99,48 H 111" />
                  <path d="M 130,60 V 25 H 145 M 130,42 H 140" />
                  <path d="M 160,60 V 25 H 175 M 160,42 H 170" />
                  <path d="M 165,15 H 180 V 65 H 165" stroke-width="4" class="opacity-30 group-hover:opacity-60 transition-opacity" />
                </svg>

                <div class="absolute top-4 left-4 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-md">
                  WIP
                </div>
              </div>

              <div class="flex-grow">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-xl font-bold text-white">Meal Planner App</h3>
                  <i class="fa-solid fa-person-digging text-slate-500 text-lg group-hover:text-orange-400 transition-colors"></i>
                </div>
                <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                  Aplicación SaaS para la organización semanal de comidas, generación de listas de compras automatizadas y gestión de inventario en el hogar.
                </p>
              </div>

              <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500 mt-auto pt-4 border-t border-slate-800">
                <span class="px-2 py-1 border border-slate-800 rounded-md group-hover:border-slate-600 transition-colors">Angular</span>
                <span class="px-2 py-1 border border-slate-800 rounded-md group-hover:border-slate-600 transition-colors">Node.js</span>
              </div>
            </div>
          </div>

          <div class="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col h-full select-none hover:border-slate-500/30 transition-colors duration-300">
            <div class="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] rounded-3xl z-10 group-hover:backdrop-blur-none transition-all duration-500"></div>
            
            <div class="relative z-20 opacity-70 grayscale-[50%] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 flex flex-col h-full">
              
              <div class="w-full h-48 mb-6 rounded-2xl relative border border-slate-800 bg-slate-900 overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#475569 1px, transparent 1px); background-size: 16px 16px;"></div>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" class="w-auto h-16 text-slate-700 group-hover:text-slate-300 transition-colors duration-500 relative z-10 drop-shadow-md" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M 35,15 H 20 V 65 H 35" stroke-width="4" class="opacity-30 group-hover:opacity-60 transition-opacity" />
                  <path d="M 50,60 V 25 L 65,40 L 80,25 V 60" />
                  <path d="M 95,60 L 105,25 L 115,60 M 99,48 H 111" />
                  <path d="M 130,60 V 25 H 145 M 130,42 H 140" />
                  <path d="M 160,60 V 25 H 175 M 160,42 H 170" />
                  <path d="M 165,15 H 180 V 65 H 165" stroke-width="4" class="opacity-30 group-hover:opacity-60 transition-opacity" />
                </svg>

                <div class="absolute top-4 left-4 bg-slate-800/50 text-slate-300 border border-slate-600/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-md">
                  Próximamente
                </div>
              </div>

              <div class="flex-grow">
                <div class="flex justify-between items-center mb-3">
                  <h3 class="text-xl font-bold text-white">Taller Irma</h3>
                  <i class="fa-solid fa-palette text-slate-500 text-lg group-hover:text-slate-300 transition-colors"></i>
                </div>
                <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                  Espacio digital interactivo para publicar proyectos artísticos, webcómics, series animadas y contenido multimedia de autoría propia.
                </p>
              </div>

              <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500 mt-auto pt-4 border-t border-slate-800">
                <span class="px-2 py-1 border border-slate-800 rounded-md group-hover:border-slate-600 transition-colors">Astro</span>
                <span class="px-2 py-1 border border-slate-800 rounded-md group-hover:border-slate-600 transition-colors">Tailwind</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent {}