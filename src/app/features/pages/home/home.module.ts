import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { SwiperModule } from 'swiper/angular';
import { ProductsService } from 'src/app/features/services/products.service';
import { ModelsModule } from 'src/app/shared/models/models.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    ModelsModule
  ],
  declarations: [HomePage],
  providers: [ProductsService]
})
export class HomePageModule {}
