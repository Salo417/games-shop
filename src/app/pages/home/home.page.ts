import { Component, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { ProductsService } from 'src/app/services/products.service';


SwiperCore.use([Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {

  constructor(private productService: ProductsService) {}

  listProducts() {
    this.productService.getAllProducts();
  }
}
