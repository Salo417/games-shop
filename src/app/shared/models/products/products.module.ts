import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './views/product-view.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProductViewComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ProductViewComponent]
})
export class ProductsModule { }
