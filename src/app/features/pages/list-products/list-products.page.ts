import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductViewComponent } from 'src/app/shared/models/products/views/product-view.component';
import { ProductsService } from '../../services/product-service/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  protected listOfProducts: Product[] = [];
  
  areProductsLoading: boolean = true;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    //this.listOfProducts = this.productService.getAll();
    this.loadProducts();
  }

  protected edit(prod: Product) {
    alert(`Editado ${prod.name}`);
  }

  protected delet(prod: Product) {
    alert(`¿Estás seguro de que deseas borrar ${prod.name}?`);
  }

  protected loadProducts(): Promise<void> {
    this.areProductsLoading = true;

    return this.productService.getAll()
      .then( (productList) => {
        for (let a of productList) {
          console.log(a);
        }
        this.listOfProducts = productList;
        this.areProductsLoading = false;
      })
      .catch( (err) => {
        console.error(err);
      })
      .finally( () => {
        console.log('Carga de productos finalizado.');
        for (let a of this.listOfProducts) {
          console.log(a);
        }
      });
  }

  protected onIonInfinite(ev: Event) {
    setTimeout( () => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
