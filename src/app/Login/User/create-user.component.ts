import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { ApiRest } from '../../API-REST/API.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-create',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  LoginUser;
  downloadURL: Observable<string>;
  userData;
  url2;
  paises;
  constructor(
    private apiRest: ApiRest,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.LoginUser = this.formBuilder.group({
      idTipo: 1,
      nombre: '',
      apellido: '',
      correo: '',
      contrasenia: '',
      fechaNacimiento: '',
      pais: '',
      creditos: 100,
      foto: '',
      estado: '0'
    });
  }
  ngOnInit(): void {
    this.apiRest.getPaises().subscribe((data: {}) => {
      this.paises = data;
    });
  }
  Create(data){
    data.foto = this.url2;
    this.apiRest.addCustomer(data).subscribe((result) => {
      alert('Usuario Creado Exitosamente');
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
