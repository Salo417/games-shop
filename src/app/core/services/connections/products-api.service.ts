import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, map, Observable, Subscription } from 'rxjs';
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
    ENDP_IMG: '/api/upload/',
    PORT:     '1337',
    TOKEN:    'a18add5afe2da4453c5be66d8bd94eef532d888d7808783173a902ef84026763c9b8216f1c6fcd797ea0e57f5d5d88638740028311f035d925d5c49103996c68505526a124fe125abc2993e4854340f4abaa9768fd5b30ff9e202b83757b3bf24fee0947eed2eca1487e966bf5df7adaefab0b6b609adc7d3e429b800135e9ee',
    JWT:      sessionStorage.getItem("jwt")
  }
  private static readonly FULL_API_URL = `http://${ProductsApiService.AUTH_API.DOM}:${ProductsApiService.AUTH_API.PORT}${ProductsApiService.AUTH_API.ENDP_URL}`;
  private static readonly IMAGES_URL   = `http://${ProductsApiService.AUTH_API.DOM}:${ProductsApiService.AUTH_API.PORT}${ProductsApiService.AUTH_API.ENDP_IMG}`;

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

  /**
   * 
   * @param product 
   * @throws HTTP error if something goes wrong, like Internet connection, server down...
   */
  public async postProduct(product: IProduct) {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");    // Quizas a mejorar el jwt quizas poniendolo en una var static independiente o poner en constructor
    let fReader     = new FileReader();
    let responseID  = -1;
    let compleat    = false;
    const imageData = new FormData();
    let prd         = {
      name:         product.name,
      platform:     product.platform,
      price:        product.price,
      release_date: product.releaseDate,
      description:  product.description,
      quantity:     product.quantity
    }
    let failed = false;
    const triggError = (error?: any) => { console.log('Se va a lanzar un error'); throw new Error(error); }
    const headers1 = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });
    const headers2 = new HttpHeaders({
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      //'Content-Type': 'multipart/form-data',
      //'Accept': '*/*',
      //'Connection': 'keep-alive'
    });

    imageData.append('image', product.picture!, product.picture?.name);
    console.debug('Picture in API post service: ', product.picture);
    console.debug(imageData);
    // const startConx = async () => {
    //   await lastValueFrom( 
    //     this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
    //   )
    //     .then(response => { responseID = (response as any).data.id; })
    //     .catch(error => { throw new Error(error); });
    //   await lastValueFrom(
    //     this.http.put(`${ProductsApiService.FULL_API_URL}/${responseID}`, {data: {picture: image}}, { headers: headers2, responseType: 'json'})
    //   ).catch(error => { throw new Error(error); });
    // }


    // fReader.readAsDataURL(product.picture!);
    // fReader.addEventListener('load', async ev => {
    //   let image: string = ((ev.target! as any).files as string);

    //   try {
    //     await lastValueFrom( 
    //       this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
    //     );
    //       //.then(response => { responseID = (response as any).data.id; })
    //       //.catch(error => failed = true);
    //       //.catch(error => { throw new Error(error); });
    //       //{data: {picture: image}}
    //     responseID = (await lastValueFrom(
    //       this.http.post(`${ProductsApiService.IMAGES_URL}`, image, { headers: headers2, responseType: 'json'})
    //     ) as any).data.id;
    //       //.then(resp => responseID = (resp as any).data.id)
    //       //.catch(error => failed = true);
    //   } catch (err) {
    //     failed = true;
    //   }

    //   compleat = true;
    // });


    try {
      // await lastValueFrom( 
      //   this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
      // );
        //.then(response => { responseID = (response as any).data.id; })
        //.catch(error => failed = true);
        //.catch(error => { throw new Error(error); });
        //{data: {picture: image}}
      //responseID = (await lastValueFrom(
      //await lastValueFrom(
        this.http.post(`${ProductsApiService.IMAGES_URL}`, imageData, { headers: headers2, responseType: 'json'})
          .subscribe();
      //)// as any).data.id;
        //.then(resp => responseID = (resp as any).data.id)
        //.catch(error => failed = true);
    } catch (err) {
      //failed = true;
      triggError();
    }

    
    // fReader.addEventListener('error', error => {
    //   console.debug('Entrando en error listener.');
    //   throw new Error(error.target?.error?.message);
    // });
    // .onload = async ev => {
    //   let image: string = (ev.target?.result as string);

    //   await lastValueFrom( 
    //     this.http.post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
    //   )
    //     .then(response => { responseID = (response as any).data.id; })
    //     .catch(error => { throw new Error(error); });
    //     //{data: {picture: image}}
    //   await lastValueFrom(
    //     this.http.put(`${ProductsApiService.FULL_API_URL}/${responseID}`, {data: {picture: image}}, { headers: headers2, responseType: 'json'})
    //   ).catch(error => { throw new Error(error); });

    //   compleat = true;
    // }

    // while(compleat) { 
    //   if (failed) {
    //     console.log('Se va a lanzar un error');
    //     triggError();
    //   }
    // }
    //fReader.readAsDataURL(product.picture!);
    //fReader.
    /*
    return new Observable<Object>( observer => {
      this.http
        .post(ProductsApiService.FULL_API_URL, JSON.stringify({data: prd}), { headers: headers1, responseType: 'json'})
        .subscribe({
          next:  response => observer.next(response),
          error: error    => observer.error('Post error.')
        });

      this.http
        .post(ProductsApiService.FULL_API_URL, {data: {picture: product.picture}}, { headers: headers2, responseType: 'json'})
        .subscribe({
          next:  response => observer.next(response),
          error: error    => observer.error('Post error.')
        });
      
      console.debug("POST Product API Service compleated.");
      observer.complete();
    });
    */
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

  // private readFile(file: File): string {
  //   let fReader = new FileReader();
  //   fReader.readAsDataURL(file);
  //   fReader.addEventListener('load', ev => {
  //     return ((ev.target! as any).files as string);
  //   });

  //   setInterval()
  // }
}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on Apr-13-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */