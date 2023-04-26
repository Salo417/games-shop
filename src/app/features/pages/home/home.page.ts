import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
//import { SwiperComponent } from 'swiper/angular';

import SwiperCore, { Navigation } from 'swiper';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
import { ProductViewComponent } from 'src/app/shared/models/products/views/product-view.component';
import { EPlatforms } from 'src/app/shared/models/products/models/EPlatforms';
import { register } from 'swiper/element/bundle';


SwiperCore.use([Navigation]);

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  @ViewChild('app-product-view') productView: ProductViewComponent;
  p1: IProduct = {
    pid: 0,
    name: 'GTA V',
    price: 45.55,
    quantity: 121,
    platform: EPlatforms.PLAY_STATION_4,
    releaseDate: new Date( Date.now() )
  }
  p2: IProduct = {
    pid: 1,
    name: 'The Simpson Game',
    price: 59.95,
    quantity: 200,
    platform: EPlatforms.SWITCH,
    releaseDate: new Date( Date.now() )
  }

  constructor(private productService: ProductsService) {}

  listProducts() {
    //this.productService.getAllProducts();
  }

  edit(p?: IProduct | undefined) {
    alert(`Editado ${p.name}`);
  }
}
