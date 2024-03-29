import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './features/pages/list-products/components/add-product/add-product.component';
import { EditProductComponent } from './features/pages/list-products/components/edit-product/edit-product.component';
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
    path: 'sign-up',
    loadChildren: () => import('./features/pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'list-products',
    loadChildren: () => import('./features/pages/list-products/list-products.module').then( m => m.ListProductsPageModule),
  } /*,
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'edit-product/:pid',
    component: EditProductComponent
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  //providers: [ UserLogedService]
  //exports: [RouterModule],

})
export class AppRoutingModule { }
