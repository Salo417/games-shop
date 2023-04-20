import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductsPageRoutingModule } from './list-products-routing.module';

import { ListProductsPage } from './list-products.page';
import { ProductsModule } from 'src/app/shared/models/products/products.module';
import { ProductsService } from '../../services/product-service/products.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { DecimalValidator } from './components/add-product/directives/decimal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductsPageRoutingModule,
    ProductsModule
  ],
  declarations: [
    ListProductsPage,
    ListProductsComponent,
    AddProductComponent,
    DecimalValidator
  ],
  providers: [ProductsService]
})
export class ListProductsPageModule {}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) at Apr-13-2023 following above clause:
 * 
 * BSD 3-Clause License (Read LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */