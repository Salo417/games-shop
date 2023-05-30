import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { IonicModule } from '@ionic/angular';

import { ListProductsPageRoutingModule } from './list-products-routing.module';

import { ListProductsPage } from './list-products.page';
import { ProductsModule } from 'src/app/shared/models/products/products.module';
import { ProductsService } from '../../services/product-service/products.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DecimalValidator } from './directives/decimal-validator/decimal-validator.directive';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ImageName } from './pipes/ImageName.pipe';
import { ImageFormatValidator } from './directives/valid-image-format/valid-image-format.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductsPageRoutingModule,
    ProductsModule,
    ScrollingModule
  ],
  declarations: [
    ListProductsPage,
    DecimalValidator,
    AddProductComponent,
    EditProductComponent,
    ImageName,
    ImageFormatValidator
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