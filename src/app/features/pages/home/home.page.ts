import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { EPlatforms } from 'src/app/shared/resources/product/EPlatforms';
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
  //@ViewChild('app-product-view') productView!: ProductViewComponent;
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

  edit(p: IProduct) {
    alert(`Editado ${p.name}`);
  }
}
