import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductsPageRoutingModule } from './list-products-routing.module';

import { ListProductsPage } from './list-products.page';
import { ProductsModule } from 'src/app/shared/models/products/products.module';
import { ProductsService } from '../../services/product-service/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductsPageRoutingModule,
    ProductsModule
  ],
  declarations: [ListProductsPage],
  providers: [ProductsService]
})
export class ListProductsPageModule {}
