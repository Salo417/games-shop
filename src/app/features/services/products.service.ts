import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductsApiService, Product } from '../../core/services/api/products-api.service';

@Injectable({
  providedIn: 'platform'
})
export class ProductsService {

  constructor(
    private productApi: ProductsApiService
  ) { }

  public async getAllProducts() {
    await lastValueFrom( this.productApi.getAllProducts() )
      .then( listProduct => {
        for (let pro in listProduct) {
          console.log(pro);
        }
      })
      .catch( err => {
        console.error(err);
      });
  }
}
