import { Routes } from '@angular/router';
import { PAGE_METADATA } from './shared/seo/page-metadata';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: PAGE_METADATA.home.title,
    data: { seo: PAGE_METADATA.home },
    loadComponent: () => import('./features/home/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'demos/seguimiento-comercial',
    title: PAGE_METADATA.capture.title,
    data: { seo: PAGE_METADATA.capture },
    loadComponent: () => import('./features/demos/commercial-capture/commercial-capture.component').then(m => m.CommercialCaptureComponent)
  },
  {
    path: 'demos/dashboard-comercial',
    title: PAGE_METADATA.dashboard.title,
    data: { seo: PAGE_METADATA.dashboard },
    loadComponent: () => import('./features/demos/commercial-dashboard/commercial-dashboard.component').then(m => m.CommercialDashboardComponent)
  },
  {
    path: 'demos/formulario-crm-hoja',
    title: PAGE_METADATA.integration.title,
    data: { seo: PAGE_METADATA.integration },
    loadComponent: () => import('./features/demos/form-crm-sheet/form-crm-sheet.component').then(m => m.FormCrmSheetComponent)
  },
  {
    path: '404',
    title: PAGE_METADATA.notFound.title,
    data: { seo: PAGE_METADATA.notFound },
    loadComponent: () => import('./shared/seo/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    title: PAGE_METADATA.notFound.title,
    data: { seo: PAGE_METADATA.notFound },
    loadComponent: () => import('./shared/seo/not-found.component').then(m => m.NotFoundComponent)
  }
];
