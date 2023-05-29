import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';

import { ListProductsPage } from './list-products.page';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsPage,
    children: [
      /*
      {
        path: '',
        component: ListProductsComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
        //loadComponent: () => import('./components/add-product/add-product.component').then( m => m.AddProductComponent)
      },
      {
        path: 'edit-product/:pid',
        component: EditProductComponent
      }
      */
    ]
  },
  {
    path: 'add-product',
    component: AddProductComponent
    //loadComponent: () => import('./components/add-product/add-product.component').then( m => m.AddProductComponent)
  },
  {
    path: 'edit-product/:pid',
    component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProductsPageRoutingModule {}
