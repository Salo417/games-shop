import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsApiService } from '../../../core/services/connections/products-api.service';

@Injectable({
  providedIn: 'platform'
})
export class ProductsService /*implements Dao<IProduct>*/ {

  constructor(private productApi: ProductsApiService) {}


  // METHODS
  public async getAll(): Promise<Product[]> {
    let products: Product[];

    await lastValueFrom( this.productApi.getAllProducts() )
      .then( listProduct => {
        products = listProduct;
      })
      .catch( err => {
        console.error(err);
      });

    return products;
  }

  getById(id: number): IProduct {
    throw new Error('Method not implemented.');
  }
  save(t: IProduct) {
    throw new Error('Method not implemented.');
  }
  update(t: IProduct, params: string[]) {
    throw new Error('Method not implemented.');
  }
  delete(t: IProduct) {
    throw new Error('Method not implemented.');
  }
}