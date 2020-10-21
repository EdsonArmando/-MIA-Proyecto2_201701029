import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { ApiRest } from '../API-REST/API.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginUser;
  userData;
  constructor(
    private apiRest: ApiRest,
    private formBuilder: FormBuilder
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
        alert('Bienvenido al sistema');
      }else{
        alert('usuario y/o contrasenia incorrectos');
      }
    });
  }
}
