import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPageComponent } from '../about/about.component';
import { MainPageComponent } from '../mainPage/main-page.component';

export const router: Routes = [
  { path: 'about', redirectTo: 'about', pathMatch: 'full'},
  { path: 'about', component: AboutPageComponent },
  { path: 'equation/:name', component: MainPageComponent},
  { path: '**', redirectTo: 'about', pathMatch: 'full'} //probably should have a 404 page
  /*{ path: 'equations', component: MainPageComponent}
    should have a page describing the equations
  */
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
