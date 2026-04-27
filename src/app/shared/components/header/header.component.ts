import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
    <header class="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-slate-800/50">
      <div class="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
        <div class="font-bold text-xl tracking-tighter text-white">
          Marcos Flores - <span class="text-brand-accent">The Maff</span><span class="text-slate-400 font-mono text-sm ml-2">.dev</span>
        </div>
        <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#expertise" class="hover:text-brand-accent transition-colors">Expertise</a>
          <a href="#proyectos" class="hover:text-brand-accent transition-colors">Proyectos</a>
          <a href="#contacto" class="hover:text-brand-accent transition-colors">Contacto</a>
        </nav>
        <div class="flex items-center gap-5">
          <a href="https://github.com/TheMaff" target="_blank" rel="noopener noreferrer"
             class="text-slate-400 hover:text-white hover:scale-110 transition-all"
             aria-label="Ver mi GitHub">
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <i class="fa-brands fa-github text-2xl"></i>
          </a>
          <a href="#contacto" class="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors border border-slate-700">
            Hablemos
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent { }