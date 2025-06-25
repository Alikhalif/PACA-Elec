import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full',
  },

  {
    path: 'pricing',
    loadComponent: () => import('./core/pages/home/pricing/pricing.component').then(m => m.PricingComponent),
  },
];
