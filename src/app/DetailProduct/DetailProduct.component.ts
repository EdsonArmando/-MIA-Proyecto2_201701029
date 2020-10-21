import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiRest} from '../API-REST/API.service';
import { CartService } from '../product-cart/productCart.service';

declare var $: any;

@Component({
  selector: 'app-detail-product',
  templateUrl: './DetailProduct.component.html',
  styleUrls: ['./DetailProduct.component.css']
})
export class DetailProductComponent implements OnInit{
  productID;
  shoe;
  category;
  massage = "Quiero realizar una compra";
  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRest,
    private cartService: CartService
  ) {
  }
  ngOnInit(): void {
    $(document).ready(function(){
      let boton =  $('.ngx-whatsapp-button-float');
      boton.css('bottom','90px')
        .css('right','30px');
      var add = $('#comprar');
      add.click(function(){
        alert('Agregado Correctamente');
      });
    });
    this.route.paramMap.subscribe(params => {
      this.productID = params.get('productId');
      this.category = params.get('category');
      this.getShoe(this.productID);
      this.massage = this.massage + " del calzado de " + this.category + " con codigo " + this.productID;
    });
  }
    addToCart(product){
      this.cartService.addToCart(product);
    }
   getShoe(id){
    this.shoe = this.apiRest.getOneShoe(id).subscribe((data: {}) => {
      this.shoe = data[0];
    });
  }

}
