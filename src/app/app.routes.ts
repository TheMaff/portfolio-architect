import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'The Maff | Automatización, CRM e integraciones para empresas',
    loadComponent: () => import('./features/home/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'demos/seguimiento-comercial',
    title: 'Demo de captación y seguimiento comercial | The Maff',
    loadComponent: () => import('./features/demos/commercial-capture/commercial-capture.component').then(m => m.CommercialCaptureComponent)
  },
  { path: '**', redirectTo: '' }
];
