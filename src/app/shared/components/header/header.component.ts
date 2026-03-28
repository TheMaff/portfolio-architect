import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
    <header class="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-slate-800/50">
      <div class="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
        <div class="font-bold text-xl tracking-tighter text-white">
          Marcos Flores - <span class="text-brand-accent">The Maff</span><span class="text-slate-500 font-mono text-sm ml-2">.dev</span>
        </div>
        <nav class="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#expertise" class="hover:text-brand-accent transition-colors">Expertise</a>
          <a href="https://github.com/TheMaff" target="_blank" class="hover:text-brand-accent transition-colors">Proyectos</a>
          <a href="#contacto" class="hover:text-brand-accent transition-colors">Contacto</a>
        </nav>
        <a href="#contacto" class="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors border border-slate-700">
          Hablemos
        </a>
      </div>
    </header>
  `
})
export class HeaderComponent { }