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
  id_toInsert;
  constructor(private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private apiRest: ApiRest,
              private route: ActivatedRoute) {
    this.insertShoe = this.formBuilder.group({
      id: '',
      key: 'Edson?2020',
      name: '',
      urlImage: '',
      price: '',
      disponibilidad: '',
      cantidad: '',
      descripcion: '',
      categoria: '',
      numeracion: ''
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_toInsert = params.get('idCreate');
    });
  }
  InsertShoe(dataShoe){
    if(this.id_toInsert=='Edson2020'){
      dataShoe.urlImage = this.url2;
      this.apiRest.addShoe(dataShoe).subscribe((result) => {
        console.log('Succes');
        alert('Producto Agregado Exitosamente');
      }, (err) => {
        console.log(err);
      });
    }else{
      alert('Not Access');
    }
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
