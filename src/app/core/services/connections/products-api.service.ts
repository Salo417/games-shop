import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
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

export class ApiProduct {
  id: number;
  name: string;
  platform: ( Platforms | string );
  description: string;
  price: number;
  quantity: number;
  releaseDate: Date;
}

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

  public get restProductConne() {
    ProductsApiService.AUTH_API.JWT = sessionStorage.getItem("jwt");
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${ProductsApiService.AUTH_API.JWT}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    });

    return this.http;
    //get<Product[]>(ProductsApiService.FULL_API_URL, { headers, responseType: 'json' });
  }
}
