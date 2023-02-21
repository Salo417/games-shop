import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './views/product-view.component';



@NgModule({
  declarations: [ProductViewComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductViewComponent]
})
export class ProductsModule { }
