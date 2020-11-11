import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiRest} from '../API-REST/API.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reporte-up',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{
  id;
  data;
  titulo;
  encabezado;
  todayString: string = new Date().toDateString();
  constructor(private apiRest: ApiRest, private  router: Router,private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id === '1'){
        this.titulo = 'Reporte de la Bitacora';
        const dataEn = {
          idUsuario: 'idUsuario',
          nombre: 'Nombre',
          descripcion: 'Descripcion',
          fecha: 'fecha'
        };
        this.encabezado = dataEn;
        this.data = this.apiRest.getBitacora();
      }else if (this.id === '2'){
        this.titulo = 'Top 10 productos mas vendidos';
        const dataEn = {
          idProducto: 'idProducto',
          cantidad: 'cantidad',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta1().subscribe((data: {}) => {
          this.data = data;
        });
      }else if (this.id === '3'){
        this.titulo = 'Top 10 productos mas Likes';
        const dataEn = {
          idProducto: 'idProducto',
          cantidad: 'cantidad',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta2().subscribe((data: {}) => {
          this.data = data;
        });
      }else if (this.id === '4'){
        this.titulo = 'Top 10 productos mas No Me Gusta';
        const dataEn = {
          idProducto: 'idProducto',
          cantidad: 'cantidad',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta3().subscribe((data: {}) => {
          this.data = data;
        });
      }else if (this.id === '5'){
        this.titulo = 'Clientes con mas y menos creditos';
        const dataEn = {
          Creditos: 'Creditos',
          IdUsuario: 'IdUsuario',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta4().subscribe((data: {}) => {
          this.data = data;
        });
      }else if (this.id === '6'){
        this.titulo = 'Clientes con mas Denuncias';
        const dataEn = {
          Total: 'Cantidad',
          IdUsuario: 'IdUsuario',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta5().subscribe((data: {}) => {
          this.data = data;
        });
      }
      else if (this.id === '7'){
        this.titulo = 'Clientes con mas Productos Publicados';
        const dataEn = {
          Total: 'Cantidad',
          IdUsuario: 'IdUsuario',
          Nombre: 'Nombre'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta6().subscribe((data: {}) => {
          this.data = data;
        });
      }
      else if (this.id === '8'){
        this.titulo = 'Paises con mas creditos y productos';
        const dataEn = {
          CantidadClientes: 'Cantidad Clientes',
          idPais: 'idPais',
          Creditos: 'Creditos',
          NombrePais: 'Pais',
          CantidadProductos: 'Productos'
        };
        this.encabezado = dataEn;
        this.apiRest.getCOnsulta7().subscribe((data: {}) => {
          this.data = data;
        });
      }
    });
  }
}
