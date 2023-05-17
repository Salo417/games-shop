import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsService } from '../../services/product-service/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  protected listOfProducts: Product[] = [];
  
  areProductsLoading: boolean = true;

  constructor(
    private productService: ProductsService,
    private router:         Router,
    private route:          ActivatedRoute,
    private ionAlert:       AlertController,
    private toast:          ToastController
    ) { }

  ngOnInit() { this.loadProducts(); }


  // METHODS
  protected edit(prod: Product) {
    this.router.navigate(['edit-product', prod.pid], { relativeTo: this.route });
  }

  protected delete(prod: Product) {
    this.ionAlert.create({
      message: "¿Estás seguro de que deseas eliminar este producto?",
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel'
        },
        {
          text: "Confirmar",
          role: 'confirm',
          handler: () => {
            this.toast.create({
              message: "Eliminado...",
              animated: true,
              duration: 3500
            }).then(htmlToast => htmlToast.present() );
            this.productService.delete(prod.pid)
              .then( () => {
                this.toast.create({
                  message: "Producto eliminado correctamente.",
                  animated: true,
                  duration: 3500
                }).then(htmlToast => htmlToast.present() );
              })
              .catch( () => {
                this.toast.create({
                  message: "Ha ocurrido un error y el producto no se ha eliminado.",
                  animated: true,
                  duration: 3500
                }).then(htmlToast => htmlToast.present() );
              });
          }
        }
      ],
      animated: true
    }).then(htmlIonAlert => htmlIonAlert.present() );
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

  protected onAddProduct(){
    this.router.navigate(['add-product'], {relativeTo:this.route});
  }
}
