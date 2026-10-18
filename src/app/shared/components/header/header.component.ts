import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="fixed top-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md border-b border-slate-800/50" (keydown.escape)="closeMenu(); menuToggle.focus()">
      <div class="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-4">
        <a href="#inicio" (click)="closeMenu()" aria-label="Marcos Flores, The Maff: inicio" class="shrink-0 font-bold text-lg tracking-tighter text-white rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
          <span class="block text-xs font-medium tracking-normal text-slate-400 sm:inline sm:text-sm">Marcos Flores <span class="hidden sm:inline">—</span></span>
          <span class="text-brand-accent">The Maff</span><span class="text-slate-400 font-mono text-sm ml-1">.dev</span>
        </a>
        <nav aria-label="Navegación principal" class="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
          @for (link of links; track link.href) {
            <a [href]="link.href" class="hover:text-brand-accent transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">{{ link.label }}</a>
          }
        </nav>
        <div class="flex items-center gap-3 sm:gap-5">
          <a href="https://github.com/TheMaff" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex text-slate-400 hover:text-white transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400" aria-label="Ver perfil de The Maff en GitHub (abre una nueva pestaña)">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="#contacto" (click)="closeMenu()" class="hidden sm:inline-flex bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors border border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">Hablemos</a>
          <button #menuToggle type="button" class="xl:hidden inline-flex items-center justify-center w-11 h-11 text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400" [attr.aria-expanded]="menuOpen()" aria-controls="mobile-navigation" [attr.aria-label]="menuOpen() ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'" (click)="toggleMenu()">
            @if (menuOpen()) {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="m6 6 12 12M6 18 18 6" /></svg>
            } @else {
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Navegación móvil" class="xl:hidden border-t border-slate-800 px-6 sm:px-8 py-4 bg-brand-dark" [class.hidden]="!menuOpen()">
        <div class="max-w-6xl mx-auto flex flex-col gap-1">
          @for (link of links; track link.href) {
            <a [href]="link.href" (click)="closeMenu()" class="text-slate-200 hover:text-white hover:bg-slate-800/70 px-4 py-3 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">{{ link.label }}</a>
          }
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  readonly menuOpen = signal(false);
  readonly links = [
    { href: '#soluciones', label: 'Soluciones' },
    { href: '#proceso', label: 'Cómo trabajamos' },
    { href: '#experiencia', label: 'Experiencia' },
    { href: '#contacto', label: 'Contacto' }
  ] as const;

  toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
