import {Component, OnInit} from '@angular/core';
import { CartService } from './productCart.service';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-product-cart',
  templateUrl: './productCart.component.html',
  styleUrls: [ './productCart.component.css' ]
})

export class ProductCartComponent implements OnInit{
  items;
  total = 0;
  products;
  constructor(
    private cartService: CartService
  ) {
  }
  ngOnInit(): void {
    $(document).ready(function(){
      let boton =  $('.ngx-whatsapp-button-float');
      boton.css('bottom','90px')
        .css('right','30px');
    });
    this.items = this.cartService.getItems();
    for (let entry of this.items) {
      this.total +=  entry.price;
    }
  }
  delete(id){
    this.cartService.deleteItem(id);
    this.total = 0;
    this.ngOnInit();
  }
  comprar(){
    let pila: [] = JSON.parse(localStorage.getItem('pila'));
    this.products = JSON.stringify(pila);
    alert('Su pedido fue enviado exitosamente ' + this.products);
  }
}
