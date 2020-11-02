import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { ApiRest } from '../API-REST/API.service';
import { Router } from '@angular/router';
import {OptionMenuComponent} from '../OptionMenu/OptionMenu.component';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginUser;
  userData;
  tipoUsuario;
  idUsuario;
  constructor(
    private apiRest: ApiRest,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.LoginUser = this.formBuilder.group({
      nombre: '',
      email: '',
      password: ''
    });
  }
  ngOnInit(): void {
  }
  Login(data){
    this.userData = this.apiRest.loginUser(data.nombre, data.password).subscribe((result: {}) => {
      this.userData = result;
      if (this.userData.length === 1){
        this.tipoUsuario = this.userData[0].NOMBRE;
        alert('Bienvenido al Sistema');
        this.apiRest.username = this.userData[0].NOMBRE;
        this.router.navigate(['./listShoes/List']);
      }else{
        alert('usuario y/o contrasenia incorrectos');
      }
      if (this.tipoUsuario === 'admin'){
          this.idUsuario = this.apiRest.getIdUsuario(this.tipoUsuario).subscribe((data2: {}) => {
            this.apiRest.setId(data2[0].idUsuario);
            this.apiRest.setLogin();
          });
      }else{
        this.idUsuario = this.apiRest.getIdUsuario(this.tipoUsuario).subscribe((data2: {}) => {
          this.apiRest.setId(data2[0].idUsuario);
          this.apiRest.setLogin();
        });
      }
    });
  }
}
