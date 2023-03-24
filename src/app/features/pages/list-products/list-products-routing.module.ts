import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

import { ListProductsPage } from './list-products.page';

const routes: Routes = [
  {
    path: '',
    component: ListProductsPage,
    children: [
      {
        path: '',
        redirectTo: 'list-products',
        pathMatch: 'full'
      },
      {
        path: 'list-products',
        component: ListProductsComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProductsPageRoutingModule {}
