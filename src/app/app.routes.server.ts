import { RenderMode, ServerRoute } from '@angular/ssr';

// Netlify serves these files directly; no server runtime or paid rendering is required.
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'demos/seguimiento-comercial', renderMode: RenderMode.Prerender },
  { path: 'demos/dashboard-comercial', renderMode: RenderMode.Prerender },
  { path: 'demos/formulario-crm-hoja', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client }
];
