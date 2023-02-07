import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/classes/IUser';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@capacitor/core';


export class User implements IUser {
  id:        number;
  username:  string;
  lastname:  string;
  email:     string;
  password?: string;
  picture?:  string;

  constructor(id: number, userName: string, email: string, password?: string, picture?: string) {
    this.id       = id;
    this.username = userName;
    this.email    = email;
    this.password = password;
    this.picture  = picture;
  }

  toString(): string { return `id: ${this.id}, username: ${this.username}, lastname: ${this.lastname}, email: ${this.email}, password: ${this.password}`; }
}

@Injectable({
  providedIn: 'platform'
})
export class UserLogedService {
  // PROPIEDADES
  private static token:      string;
  private static instantied: boolean = false;

  private static readonly DOM:           string = 'localhost';
  private static readonly API_URL_USERS: string = 'api/auth/local/register';
  private static readonly API_PORT:      string = '1337';
  private static readonly FULL_API_POST: string = `http://${UserLogedService.DOM}:${UserLogedService.API_PORT}/${UserLogedService.API_URL_USERS}`;

  private static readonly AUTH_API = {
    DOM:      'localhost',
    ENDP_URL: 'api/auth/local',
    PORT:     '1337'
  }
  private static readonly FULL_API_AUTH = `http://${UserLogedService.AUTH_API.DOM}:${UserLogedService.AUTH_API.PORT}/${UserLogedService.AUTH_API.ENDP_URL}`;

  private _user: User;


  // CONSTRUCTORES
  constructor(private http: HttpClient) {
    if (UserLogedService.instantied) {
      throw new Error('Service UserLogedService is created yet, you only can create 1 instance of this service.')
    }

    UserLogedService.instantied = true;
  }

  // GETTERS
  public get user(): (User | null) { return this._user; }

  // SETTERS
  public set user(user: User) {
    if (user.email.length <= 0) {
      console.log("Cadena no puede estár vacía. Arreglar esto en el futuro con throw exception y password también y otras variables y en el otro setter.");
    }

    this._user = user;
  }


  // METHODS
  /**
   * Generate a message error depending of the HTTP result code.
   * @param error The http error.
   * @param caught 
   * @returns 
   */
  private httpErrorGenerator(error: HttpErrorResponse, caught: Observable<string>): Observable<never> {
    let retErrorException: Error = null;

    if (error.status === 0) {
      console.log(error.error);
      retErrorException = new Error("Código de error: 0. No se ha podido conectar al servidor, compruebe su conexión a internet.");
    } else {
      console.log(error.error);
      retErrorException = new Error(`Ha ocurrido un error inesperado. Código del error: ${error.error.error.status} ${error.error.error.name} - ${error.error.error.message}`)
    }

    return throwError(() => retErrorException);
  }


  /**
   * Authentication method to REST API in base to email and password.
   * @param email User's email from who wants login.
   * @param password The password introduced by user.
   */
  public async authUser(email: string, password: string): Promise<IUser> {
    //let ret: (IUser | Error);
    let credentialsJson = JSON.stringify({identifier: email, password: password});
    let options: { 
      headers?:         HttpHeaders | { [header: string]: string | string[]; }, 
      observe:          'body', 
      context?:         HttpContext, 
      params?:          HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; }, 
      reportProgress?:  boolean, 
      responseType?:    'json', 
      withCredentials?: boolean 
    } = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json'}),
      observe: 'body',
      responseType: 'json'
    }

    let request = this.http.post<any>(UserLogedService.FULL_API_AUTH, credentialsJson, options)
      .pipe( catchError(this.httpErrorGenerator) );
    
    await lastValueFrom<any>(request)
      .then( response => {
        console.log("Autenticación confirmada.");

        this._user = new User(
          response.user.id,
          response.user.username,
          response.user.email
        );
        UserLogedService.token = response.jwt;
        //console.log(response.user);
        //console.log(response.jwt);
        //console.log( this.user.toString() );
        //console.log(UserLogedService.token);

        //ret = this._user;
    });
    /*
      .catch( error => {
        //console.log(typeof error);
        //console.error("Ha ocurrido un error desconocido" + error);
        ret = error;
      });
    */
    
    return this._user;
  }


  /**
   * Submit an user to back-end.
   * @param user The user that will submit using the IUser interface.
   * @returns Promise for starting connection that returns the http response JSON string.
   */
  public postUser(user: IUser): Promise<string> {
    /*
      let options: {
        headers?:         HttpHeaders | {[header: string]: string | string[]};
        context?:         HttpContext;
        observe?:         'body' | 'events' | 'response';
        params?:          HttpParams | {[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>};
        reportProgress?:  boolean;
        responseType:    'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
      } 
      */

    let resJson = JSON.stringify(user);
    let options: { 
      headers?:         HttpHeaders | { [header: string]: string | string[]; }, 
      observe:          'body', 
      context?:         HttpContext, 
      params?:          HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; }, 
      reportProgress?:  boolean, 
      responseType?:    'json', 
      withCredentials?: boolean 
    } = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'body',
      responseType: 'json'
    }

    let request = this.http.post<string>(
      UserLogedService.FULL_API_POST,
      resJson,
      options
    )
      .pipe( catchError(this.httpErrorGenerator) );
    //  .subscribe(data => console.log(data));
      
    return lastValueFrom(request);
    /*
      .then(
        data  => console.log("Uauario registrado correctamente: " + data),
        error => console.error(error)
      )
      .catch(error => console.error(`No se ha podido conectar al servidor a causa de ${error}.`) );
     */
  }
}
