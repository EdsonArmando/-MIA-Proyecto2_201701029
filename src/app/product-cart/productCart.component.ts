import {Component, OnInit} from '@angular/core';
import { CartService } from './productCart.service';
import { FormBuilder } from '@angular/forms';
import {ApiRest} from '../API-REST/API.service';
declare var $: any;
@Component({
  selector: 'app-product-cart',
  templateUrl: './productCart.component.html',
  styleUrls: [ './productCart.component.css' ]
})

export class ProductCartComponent implements OnInit{
  today: number = Date.now();
  todayString: string = new Date().toDateString();
  items;
  total = 0;
  products;
  idCompra;
  constructor(
    private cartService: CartService,
    private  apiRest: ApiRest
  ) {
  }
  ngOnInit(): void {
    this.products = this.cartService.getItems();
    $(document).ready(function(){
      let boton =  $('.ngx-whatsapp-button-float');
      boton.css('bottom','90px')
        .css('right','30px');
    });
    this.items = this.cartService.getItems();
    for (let entry of this.items) {
      this.total +=  entry.price * entry.cantidad;
    }
  }
  delete(id){
    this.cartService.deleteItem(id);
    this.total = 0;
    this.ngOnInit();
  }
  comprar(){
    const data2 = {
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.apiRest.returnIdUser(),
      operacion: 'Compra de Producto',
      fecha: this.todayString
    };
    this.apiRest.setAccion(data2);
    //Insert compra(idUsuario,fecha)
    //Insert insert into detallecompra(idCompra,idProducto,cantidad,fecha)
    const data = {
      idUsuario: this.apiRest.returnIdUser(),
      fecha: this.todayString,
      total: this.total,
      correo: ''
    };
    this.apiRest.add_Compra(data, this.products).subscribe((result) => {
      alert('Compra creada Exitosamente');
      this.detalleCompra();
    }, (err) => {
      console.log(err);
    });
    // Restar Creditos
    const dataCreditos = {
      creditos: this.total,
      idUsuario: this.apiRest.returnIdUser(),
    };
    this.apiRest.updateCreditos(dataCreditos).subscribe((result) => {
      console.log('Creditos restados correctmente');
    }, (err) => {
      console.log(err);
    });
  }
  setCreditosUsuarios(){

  }
  detalleCompra(){
    console.log(this.products);
    // tslint:disable-next-line:no-shadowed-variable
    this.apiRest.getLastId().subscribe((data: {}) => {
      this.idCompra = data[0].codigo;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.products.length; i++){
        const data = {
          idCompra: this.idCompra,
          idProducto: this.products[i].id,
          cantidad: this.products[i].cantidad,
          fecha: this.todayString
        };
        this.apiRest.setCreditos(this.products[i].idUserProducto, this.products[i].price).subscribe((result) => {
          console.log('Detalle Creado Exitosamente');
        }, (err) => {
          console.log(err);
        });
        this.apiRest.addDetalleCompra(data).subscribe((result) => {
          console.log('Detalle Creado Exitosamente');
        }, (err) => {
          console.log(err);
        });
      }
    });
  }
}
