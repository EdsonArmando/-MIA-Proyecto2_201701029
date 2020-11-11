import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiRest} from '../API-REST/API.service';

@Injectable({
  providedIn: 'root'
})

export class CartService{
  items = [];
  todayString: string = new Date().toDateString();
  constructor(
    private http: HttpClient,
    private apiRest: ApiRest,
  ) {
    if(localStorage.getItem('pila') === null){
      localStorage.setItem('pila', JSON.stringify(this.items));
    }
  }
  addToCart(product, idUsuario){
    const data2 = {
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.apiRest.returnIdUser(),
      operacion: 'Agregar el Producto',
      fecha: this.todayString
    };
    this.apiRest.setAccion(data2);
    product.idUserCarrito = idUsuario;
    this.items = JSON.parse(localStorage.getItem('pila'));
    this.items.push(product);
    localStorage.setItem('pila', JSON.stringify(this.items));
  }
  getItems(){
    let pila = [];
    let pilatemp = JSON.parse(localStorage.getItem('pila'));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < pilatemp.length; i++){
      if (pilatemp[i].idUserCarrito === this.apiRest.returnIdUser()){
        pila.push(pilatemp[i]);
      }
    }
    return pila;
  }
  clearCart(){
    this.items = [];
    return this.items;
  }
   deleteItem(id) {
     let pila: [any] = JSON.parse(localStorage.getItem('pila'));
     let index =  pila.findIndex(x => x.id === id);
     pila.splice(index, 1);
     localStorage.setItem('pila', JSON.stringify(pila));
   }

}
