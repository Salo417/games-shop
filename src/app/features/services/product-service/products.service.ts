import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsApiService } from '../../../core/services/connections/products-api.service';
import { Dao } from 'src/app/shared/resources/dao/Dao';
import { ErrUserPidNotDefined } from 'src/app/shared/errors/ErrUserPidNotDefined';

@Injectable({
  providedIn: "platform"
})
export class ProductsService implements Dao<IProduct> {

  constructor(private productApi: ProductsApiService) {}


  // METHODS
  async getAll(): Promise<Product[]> {
    let products: Product[] = [];

    await lastValueFrom( this.productApi.getAllProducts() )
      .then( listProduct => {
        products = listProduct;
      })
      .catch( err => {
        console.error(err);
      });

    return products;
  }

  async getById(id: number): Promise<IProduct> {
    return await lastValueFrom( this.productApi.getProduct(id) );
  }

  //Mirar funcion de abajo comentada
  async save(...product: IProduct[]) {
    
    product.forEach( async (value, index, array) => {
      console.debug('Starting connection to server...');
      await lastValueFrom( this.productApi.postProduct(value) )
        .then( (value) => { })
        .catch( (reason) => {
          console.debug('Entrado en un error.');
          throw new Error(reason);
        });
    });

  }
  /*
  save(...product: IProduct[]): Promise<Object> {
    //Estoy por lanzar un observable para cada promesa que se ejecute
    product.forEach( async (value, index, array) => {
      console.debug('Starting connection to server...');
      return lastValueFrom( this.productApi.postProduct(value) );
    });

  }
  */

  update(product: IProduct): Observable<Object> {

    /*
    this.productApi.updateProduct(product)
      .subscribe( {
        error: (reason) => { throw new Error(reason) }
      });
     */
    return this.productApi.updateProduct(product);
  }

  async delete(id: number | IProduct) {
    if (typeof id == 'number') {
      await lastValueFrom( this.productApi.deleteProduct(id) )
        .then( (value) => { } )
        .catch( (reason) => {
          throw new Error(reason);
        });
    } else if (typeof id == 'object') {
      if (typeof(id.pid) == 'number') {
        await lastValueFrom( this.productApi.deleteProduct(id.pid) )
          .then( (value) => { } )
          .catch( (reason) => {
            throw new Error(reason);
          });
      } else {
        throw new ErrUserPidNotDefined();
      }
    } else {
      console.debug('parameter is not number or object.');
    }
  }
}
