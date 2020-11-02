import {Injectable, Input, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


const endpoint = 'https://storeonline-eg-mysql.herokuapp.com/';
const endpointLocal = 'http://192.168.0.35:3031/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': 'https://storeonlineeg-e1c21.web.app/'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiRest{
   login = false;
   idUser = 0;
   username;
  constructor(private httpClient: HttpClient) { }
  public getOneShoe(id): Observable<any>{
    console.log(id);
    return this.httpClient.put<any>(endpoint + 'getShoe/' + id, '{ "id": "' + id + '" }' , httpOptions);
  }
  public returnIndex(){
    return 0;
  }
  public returnIdUser(){
    return this.idUser;
  }
  public setId(value){
    console.log(value);
    this.idUser = value;
  }
  public returnLogin(){
    return this.login;
  }
  public setLogin(){
    this.login = true;
  }
  public addShoe(shoe): Observable<any> {
    return this.httpClient.post<any>(endpoint + 'addShoe', JSON.stringify(shoe), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(( shoe ) => console.log(`added product w/ id=${shoe.id}`)),
    );
  }
  public addVenta(venta): Observable<any> {
    return this.httpClient.post<any>(endpoint + 'addVenta', JSON.stringify(venta), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(( venta ) => console.log(`added product w/ id=${venta.estilo}`)),
    );
  }
  public  getShoes(): Observable<any>{
    return this.httpClient.get(endpoint + 'shoes');
  }
  public getShoesBoy(): Observable<any>{
    return this.httpClient.get(endpoint + 'shoes/Nino');
  }
  public getShoesGirl(): Observable<any>{
    return this.httpClient.get(endpoint + 'shoes/Nina');
  }
  public getShoesDama(): Observable<any>{
    return this.httpClient.get(endpoint + 'shoes/Dama');
  }
  public getShoesCaballero(): Observable<any>{
    return this.httpClient.get(endpoint + 'shoes/Caballero');
  }
  // Api Local
  public getPaises(): Observable<any>{
    return this.httpClient.get(endpointLocal + 'getPaises');
  }
  public getCategorias(): Observable<any>{
    return this.httpClient.get(endpointLocal + 'getCategorias');
  }
  public getProducts(): Observable<any>{
    return this.httpClient.get(endpointLocal + 'getProducto');
  }
  public getIdUsuario(user): Observable<any>{
    return this.httpClient.put<any>(endpointLocal + 'getId', '{ "username": "' + user + '" }' , httpOptions);
  }
  public getDataUsuario(user): Observable<any>{
    return this.httpClient.put<any>(endpointLocal + 'getUser', '{ "id": ' + user + ' }' , httpOptions);
  }
  public getOneProducto(id): Observable<any>{
    return this.httpClient.put<any>(endpointLocal + 'oneProduct', '{ "id": "' + id + '" }' , httpOptions);
  }
  public loginUser(user, password): Observable<any>{
    return this.httpClient.put<any>(endpointLocal + 'Login', '{ "username": "' + user
      + '","contrasenia": "' + password + '" }' , httpOptions);
  }
  public addCustomer(customer): Observable<any> {
    return this.httpClient.post<any>(endpointLocal + 'CreateUser', JSON.stringify(customer), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(( customer ) => console.log(`added product w/ id=${customer.nombre}`)),
    );
  }
  public addProducto(producto): Observable<any> {
    return this.httpClient.post<any>(endpointLocal + 'CreateProducto', JSON.stringify(producto), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(( producto ) => console.log(`added product w/ id=${producto.nombre}`)),
    );
  }
  public addCategoria(data): Observable<any> {
    return this.httpClient.post<any>(endpointLocal + 'insertCategoria', JSON.stringify(data), httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap(( data ) => console.log(`added product w/ id=${data.nombre}`)),
    );
  }
}
