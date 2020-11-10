import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ApiRest} from '../API-REST/API.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-shoe',
  templateUrl: './createShoe.component.html',
  styleUrls: ['./createShoe.component.css']
})
export class CreateShoeComponent implements OnInit{
  insertShoe;
  downloadURL: Observable<string>;
  url2;
  categorias;
  constructor(private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private apiRest: ApiRest,
              private route: ActivatedRoute) {
    this.insertShoe = this.formBuilder.group({
      nombre: '',
      foto: '',
      precio: '',
      detalleProducto: '',
      idCategoria: '',
      idUsuario: this.apiRest.returnIdUser(),
    });
  }
  ngOnInit(): void {
    this.apiRest.getCategorias().subscribe((data: {}) => {
      this.categorias = data;
    });
  }
  InsertShoe(dataShoe){
      dataShoe.idCategoria = Number(dataShoe.idCategoria);
      dataShoe.foto = this.url2;
      this.apiRest.addProducto(dataShoe).subscribe((result) => {
        console.log('Succes');
        alert('Producto Agregado Exitosamente');
      }, (err) => {
        console.log(err);
      });
  }
  onFileSelected(event){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `upload/imagen_${id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file );
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.url2 = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
}
