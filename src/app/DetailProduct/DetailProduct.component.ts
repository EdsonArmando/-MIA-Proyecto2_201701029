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
  first = false;
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
    this.apiRest.getMeGusta(Number(this.productID)).subscribe((data: {}) => {
      this.cantidadLike = data[0].cantidad;
    });
    this.apiRest.getNoMeGusta(Number(this.productID)).subscribe((data: {}) => {
      this.cantidadDisLike = data[0].cantidad;
    });
  }
    like(valor){
      const data = {
        idUsuario: this.apiRest.returnIdUser(),
        idProducto: this.productID
      };
      if (this.ejecutad === false){
        this.cantidadLike += valor;
        this.apiRest.addMegusta(data).subscribe((result) => {
          console.log('Me gusta');
        }, (err) => {
          console.log(err);
        });
        if (this.first === true){
          this.cantidadDisLike -= 1;
        }
        this.ejecutad = true;
      }
    }
    dislike(valor){
      const data = {
        idUsuario: this.apiRest.returnIdUser(),
        idProducto: this.productID
      };
      this.apiRest.addNoMegusta(data).subscribe((result) => {
        console.log('No Me gusta');
      }, (err) => {
        console.log(err);
      });
      this.cantidadDisLike += 1;
      this.ejecutad = false;
      this.first = true;
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
