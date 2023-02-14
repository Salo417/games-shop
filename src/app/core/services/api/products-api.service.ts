import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogedService } from './user-loged.service';


export enum Platforms {
  PLAY_STATION_4 = 'PlayStation 4',
  PLAY_STATION_5 = 'PlayStation 5',
  XBOX_360       = 'Xbox 360',
  XBOX_ONE       = 'Xbox One',
  SWITCH         = 'Nintendo Switch',
  PC             = 'PC'
}

export class Product {
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

  /* El problema de esto es que este servicio se carga al inicio del programa, por lo que todavia no se a logeado.
   * Como predije este servicio deberia ser de hambito local, es decir que se cargue al inicializar el modulo donde
   * se requiera este servicio y se cierra cuando no sea necesario. Eso si que sea de hambito local no quiero decir
   * que deba de dejar de ser singleton. Investigar como crear un servicio singleton que se cargue despues, quizas lazy
   * y donde guardarlo?
   */
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
      throw new Error('Service ProductsApiService is created yet, you only can create 1 instance of this service.')
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

    return this.http.get<Product[]>(ProductsApiService.FULL_API_URL, { headers, responseType: 'json' });
  }
}
