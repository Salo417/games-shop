import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsApiService } from '../../../core/services/connections/products-api.service';
import { Dao } from 'src/app/shared/resources/dao/Dao';

@Injectable({
  providedIn: "platform"
})
export class ProductsService implements Dao<IProduct> {

  constructor(private productApi: ProductsApiService) {}


  // METHODS
  async getAll(): Promise<Product[]> {
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

  async save(...product: IProduct[]) {

    product.forEach( async (value, index, array) => {
      console.debug('Starting connection to server...');
      await lastValueFrom( this.productApi.postProduct(value) )
        .then( (value) => { })
        .catch( (reason) => {
          throw new Error(reason);
        });
    });

  }

  update(t: IProduct, params: string[]) {
    throw new Error('Method not implemented.');
  }

  async delete(id: number | IProduct) {
    if (typeof id == 'number') {
      await lastValueFrom( this.productApi.deleteProduct(id) )
        .then( (value) => { } )
        .catch( (reason) => {
          throw new Error(reason);
        });
    } else if (typeof id == 'object') {
      await lastValueFrom( this.productApi.deleteProduct(id.pid) )
        .then( (value) => { } )
        .catch( (reason) => {
          throw new Error(reason);
        });
    } else {
      console.debug('parameter is not number or object.');
    }
  }
}
