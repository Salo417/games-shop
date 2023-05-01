import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

//import Swiper from 'swiper';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { ProductsModule } from 'src/app/shared/models/products/products.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    //SwiperModule,
    ProductsModule
  ],
  declarations: [HomePage],
  providers: [ProductsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
