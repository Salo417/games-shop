import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsApiService } from 'src/app/core/services/connections/products-api.service';
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
  /*
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
  */
 /**
  * 
  * @throws HTTP error if something goes wrong, like Internet connection, server down...
  * @param product 
  * @returns 
  */
  save(...product: IProduct[]): Observable<void> {
    console.debug('Starting connection to server...');
    return new Observable( observable => {
      const numConections = product.length;
      const listError     = [];             // idk if exist something similar to Java ArrayList in JS/TS
      let counter = 0;
      let incident = false;
      const compleatEvent = () => {
        ++counter;
        
        console.assert(counter <= numConections, 'Counter sholud be less or equal than numConnections.');
        if      (numConections == counter  &&  !incident) 
          observable.complete();
        else if (numConections == counter  &&   incident)
          observable.error();
      }
      const onFailed = (error: any) => {
        incident = true;
        listError.push(error);
      }

      product.forEach( value => {
        //observable.next( lastValueFrom( this.productApi.postProduct(value) ).catch( error => observable.error(error) ).finally( () => compleatEvent() ) );
        //observable.next(this.productApi.postProduct(value).catch(error => observable.error(error)).finally( () => compleatEvent() ));
        //this.productApi.postProduct(value).finally( () => compleatEvent() );
        this.productApi.postProduct(value).catch( error => onFailed(error) ).finally( () => compleatEvent() );
      });
    });
  }

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
