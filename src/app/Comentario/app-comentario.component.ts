import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ApiRest} from '../API-REST/API.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-comentario',
  templateUrl: './app-comentario.component.html',
  styleUrls: ['./app-comentario.component.css']
})
export class AppComentarioComponent implements OnInit{
  formCat;
  comentarios;
  productID;
  todayString: string = new Date().toDateString();
  constructor(private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private apiRest: ApiRest,
              private route: ActivatedRoute) {
    this.formCat = this.formBuilder.group({
      idUsuario: this.apiRest.returnIdUser(),
      idProducto: this.productID,
      descripcion: '',
      fecha: '5/02/2011'
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productID = params.get('productId');
    });
    this.apiRest.getComentarios(Number(this.productID)).subscribe((data: {}) => {
      this.comentarios = data;
    });
  }
  Denunciar(){
    const data2 = {
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.apiRest.returnIdUser(),
      operacion: 'Denuncia de Producto',
      fecha: this.todayString
    };
    this.apiRest.setAccion(data2);
    const data = {
      idUsuario: this.apiRest.returnIdUser(),
      idProducto: this.productID,
      descripcion: prompt('Porque dese denuenciar este producto'),
      fecha: '02/05/2020',
      estado: 'f'
    };
    this.apiRest.addDenuncia(data).subscribe((result) => {
      alert('Denuncia agregada Exitosamente');
    }, (err) => {
      console.log(err);
    });
  }
  InsertComentario(dataComentario){
    const data2 = {
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.apiRest.returnIdUser(),
      operacion: 'Comentario de Producto',
      fecha: this.todayString
    };
    this.apiRest.setAccion(data2);
    dataComentario.idProducto = this.productID;
    this.apiRest.addComentario(dataComentario).subscribe((result) => {
      alert('Comentario agregada Exitosamente');
    }, (err) => {
      console.log(err);
    });
  }
}
