import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { Product } from 'src/app/shared/models/products/models/Product';
import { DeleteProductViewComponent } from '../delete-product-view/delete-product-view.component';

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
    private route: ActivatedRoute,
    private modal: ModalController
    ) { }

  ngOnInit() { this.loadProducts(); }

  protected edit(prod: Product) {
    //alert(`Editado ${prod.name}`);
    //console.log( await this.productService.getById(prod.pid) );
    this.router.navigate(['/edit-product'], {queryParams: {product: prod} });
  }

  protected delete(prod: Product) {
    //alert(`¿Estás seguro de que deseas borrar ${prod.name}?`);
    /*
    this.modal.create({
      component: DeleteProductViewComponent,
      componentProps?: { [key: string]: any };
      presentingElement?: HTMLElement;
      showBackdrop?: boolean;
      backdropDismiss?: boolean;
      cssClass?: string | string[];
      animated?: boolean;
      canDismiss?: boolean | ((data?: any, role?: string) => Promise<boolean>);
    
      mode?: 'ios' | 'md';
      keyboardClose?: boolean;
      id?: string;
      htmlAttributes?: { [key: string]: any };
    
      enterAnimation?: AnimationBuilder;
      leaveAnimation?: AnimationBuilder;
    
      breakpoints?: number[];
      initialBreakpoint?: number;
      backdropBreakpoint?: number;
      handle?: boolean;
    });
    */
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

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on Apr-13-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */