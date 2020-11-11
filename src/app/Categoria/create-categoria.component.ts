import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ApiRest} from '../API-REST/API.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit{
  formCat;
  todayString: string = new Date().toDateString();
  constructor(private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private apiRest: ApiRest,
              private route: ActivatedRoute) {
    this.formCat = this.formBuilder.group({
      nombre: ''
    });
  }
  ngOnInit(): void {
  }
  InsertCategoria(dataCategoria){
    const data2 = {
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.apiRest.returnIdUser(),
      operacion: 'Insertar la Categoria',
      fecha: this.todayString
    };
    this.apiRest.setAccion(data2);
    this.apiRest.addCategoria(dataCategoria).subscribe((result) => {
      alert('Categoria agregada Exitosamente');
    }, (err) => {
      console.log(err);
    });
  }
}
