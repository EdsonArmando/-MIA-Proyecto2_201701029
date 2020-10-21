import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ApiRest} from '../API-REST/API.service';


@Component({
  selector: 'app-venta-component',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{
  insertVenta;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apiRest: ApiRest,
  ) {
    this.insertVenta = this.formBuilder.group({
      key: '',
      estilo: '',
      cantidad: '',
      fecha: '',
    });
  }
  ngOnInit(): void {
  }
  insertarVenta(dataVenta){
    console.log(dataVenta);
    this.apiRest.addVenta(dataVenta).subscribe((result) => {
      console.log('Succes');
      alert('Venta ingresada Exitosamente');
    }, (err) => {
      console.log(err);
      alert('No se pudo realizar la accion');
    });
  }
}
