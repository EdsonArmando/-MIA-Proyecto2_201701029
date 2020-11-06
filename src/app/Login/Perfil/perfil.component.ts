import {Component, Input, OnInit} from '@angular/core';
import { ApiRest } from '../../API-REST/API.service';
import {FormBuilder} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  idUser;
  ModifyUser;
  url2;
  paises;
  downloadURL: Observable<string>;
  @Input() dataUser;
  constructor(
    private apiRest: ApiRest,private storage: AngularFireStorage, private formBuilder: FormBuilder
) {
    this.dataUser = this.apiRest.dataUser;
    this.ModifyUser = this.formBuilder.group({
      idUsuario: this.apiRest.returnIdUser(),
      nombre: this.dataUser.nombre,
      apellido: this.dataUser.apellido,
      contrasenia: this.dataUser.contrasenia,
      fechaNacimiento: this.dataUser.fecha,
      correo: this.dataUser.correo,
      creditos: this.dataUser.creditos,
      pais: this.dataUser.idPais,
      foto: this.dataUser.foto,
      estado: '1'
    });
}
  ngOnInit(): void {
    this.dataUser = this.apiRest.dataUser;
    console.log(this.dataUser);
    this.apiRest.getPaises().subscribe((data: {}) => {
      this.paises = data;
    });
  }
  Create(data){
    data.foto = this.url2;
    this.apiRest.updatedataUser(data).subscribe((result) => {
      alert('Usuario Editado Exitosamente');
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
