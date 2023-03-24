import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { Product } from 'src/app/shared/models/products/models/Product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  protected listOfProducts: Product[] = [];
  
  areProductsLoading: boolean = true;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() { this.loadProducts(); }

  protected edit(prod: Product) {
    alert(`Editado ${prod.name}`);
  }

  protected delete(prod: Product) {
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

  protected goToAddProductView() {
    this.router.navigate(['add-product'], { relativeTo: this.route })
  }
}
