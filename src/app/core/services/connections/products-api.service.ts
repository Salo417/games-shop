import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { Product } from 'src/app/shared/models/products/models/Product';
import { UserLogedService } from './user-loged.service';


export enum Platforms {
  PLAY_STATION_4 = 'PlayStation 4',
  PLAY_STATION_5 = 'PlayStation 5',
  XBOX_360       = 'Xbox 360',
  XBOX_ONE       = 'Xbox One',
  SWITCH         = 'Nintendo Switch',
  PC             = 'PC'
}

/*
export class ApiProduct {
  id: number;
  name: string;
  platform: ( Platforms | string );
  description: string;
  price: number;
  quantity: number;
  releaseDate: Date;
}
*/

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private static instantied: boolean = false;

  private static /*readonly*/ AUTH_API = {
    DOM:      'localhost',
    ENDP_URL: '/api/products',
    PORT:     '1337',
    TOKEN:    'a18add5afe2da4453c5be66d8bd94eef532d888d7808783173a902ef84026763c9b8216f1c6fcd797ea0e57f5d5d88638740028311f035d925d5c49103996c68505526a124fe125abc2993e4854340f4abaa9768fd5b30ff9e202b83757b3bf24fee0947eed2eca1487e966bf5df7adaefab0b6b609adc7d3e429b800135e9ee',
    JWT:      sessionStorage.getItem("jwt")
  }
  private static readonly FULL_API_URL = `http://${ProductsApiService.AUTH_API.DOM}:${ProductsApiService.AUTH_API.PORT}${ProductsApiService.AUTH_API.ENDP_URL}`;

  constructor(
    private http: HttpClient
  ) { 
    if (ProductsApiService.instantied) {
      throw new Error('Service ProductsApiService is created yet, you can only create 1 instance of this service.')
    }

    ProductsApiService.instantied = true;
  }

  public getAllProducts(): Observable<Product[]> {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.get<any>(ProductsApiService.FULL_API_URL, { headers, responseType: 'json' })
      .pipe( map<any, Product[]>( (response, index) => {
        let lProduct: Product[] = [];

        for (let o of response.data) {
          lProduct.push(new Product(
            o.id, 
            o.attributes.name,
            o.attributes.price,
            o.attributes.quantity,
            new Date(o.attributes.release_date),
            o.attributes.platform,
            o.attributes.description
          ));

        }
        
        return lProduct;
      }));
  }

  public getProduct(id: number): Observable<IProduct> {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.get<IProduct>(`${ProductsApiService.FULL_API_URL}/${id}`, {headers, responseType: 'json'})
      .pipe( map<any, Product>( (response) => {
        return new Product(
          response.data.id,
          response.data.attributes.name,
          response.data.attributes.price,
          response.data.attributes.quantity,
          response.data.attributes.release_date,
          response.data.attributes.platform,
          response.data.attributes.description);
      }));
  }

  public postProduct(product: IProduct): Observable<Object> {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");    // Quizas a mejorar el jwt quizas poniendolo en una var static independiente o poner en constructor
    //let fReader = new FileReader();
    let prd = {
      name:         product.name,
      platform:     product.platform,
      price:        product.price,
      release_date: product.releaseDate,
      description:  product.description,
      quantity:     product.quantity
    }
    const headers1 = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    const headers2 = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'image/jpeg; image/png;',
      'Accept': 'application/json'
    });
    console.debug('Picture in API post service: ', product.picture);
    //fReader.readAsDataURL(product.picture!);
    //fReader.
    return new Observable<Subscription>( observer => {
      observer.next(this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
        .subscribe({
          error: error => {
            observer.error('Post error.');
          }
        }) );

      observer.next(this.http.post(ProductsApiService.FULL_API_URL, {data: {picture: product.picture}}, { headers: headers2, responseType: 'json'})
        .subscribe({
          error: error => {
            observer.error('Post error.');
          }
        }) );
    });
    //return this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'});
  }

  public deleteProduct(id: number) {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");    // Quizas a mejorar el jwt quizas poniendolo en una var static independiente o poner en constructor
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http.delete(`${ProductsApiService.FULL_API_URL}/${id}`, { headers, responseType: "json" });
  }

  public updateProduct(product: IProduct) {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");    // Quizas a mejorar el jwt quizas poniendolo en una var static independiente o poner en constructor
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    const p = {
      name:         product.name,
      platform:     product.platform,
      price:        product.price,
      release_date: product.releaseDate,
      description:  product.description,
      quantity:     product.quantity
    };

    return this.http.put(`${ProductsApiService.FULL_API_URL}/${product.pid}`, JSON.stringify({data: p}), { headers, responseType: "json" });
  }

  public get restProductConne() {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    });

    return this.http;
    //get<Product[]>(ProductsApiService.FULL_API_URL, { headers, responseType: 'json' });
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