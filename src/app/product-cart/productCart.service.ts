import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService{
  items = [];
  constructor(
    private http: HttpClient
  ) {
    if(localStorage.getItem('pila') === null){
      localStorage.setItem('pila', JSON.stringify(this.items));
    }
  }
  addToCart(product){
    this.items = JSON.parse(localStorage.getItem('pila'));
    this.items.push(product);
    localStorage.setItem('pila', JSON.stringify(this.items));
  }
  getItems(){
    return JSON.parse(localStorage.getItem('pila'));
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
