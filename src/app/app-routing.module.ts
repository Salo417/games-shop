import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { UserLogedService } from './core/services/api/user-loged.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./features/pages/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'hired-services',
    loadChildren: () => import('./features/pages/hired-services/hired-services.module').then( m => m.HiredServicesPageModule)
  },
  {
    path: 'energy-consumtion',
    loadChildren: () => import('./features/pages/energy-consumtion/energy-consumtion.module').then( m => m.EnergyConsumtionPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'list-products',
    loadChildren: () => import('./features/pages/list-products/list-products.module').then( m => m.ListProductsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  //providers: [ UserLogedService]
  //exports: [RouterModule],

})
export class AppRoutingModule { }
