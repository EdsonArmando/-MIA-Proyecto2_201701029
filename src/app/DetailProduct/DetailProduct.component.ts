import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  idUser;
  category;
  ejecutad: boolean = false;
  @Input() cantidadLike = 1;
  @Input() cantidadDisLike = 1;
  massage = "Quiero realizar una compra";
  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRest,
    private cartService: CartService,
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    this.idUser = this.apiRest.returnIdUser();
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
    like(valor){
      if (this.ejecutad === false){
        this.cantidadLike += valor;
        this.ejecutad = true;
      }
    }
    dislike(valor){
      if (this.ejecutad === true){
        this.cantidadDisLike += 1;
        this.cantidadLike = this.cantidadLike - 1;
        this.ejecutad = false;
      }
    }
    comentarioProducto(data){
      this.router.navigate(['./comentario'+'/'+this.productID]);
    }
    addToCart(product,cantidad){
      product.cantidad = cantidad;
      this.cartService.addToCart(product, this.idUser);
    }
   getShoe(id){
    this.shoe = this.apiRest.getOneProducto(id).subscribe((data: {}) => {
      this.shoe = data[0];
    });
  }

}
