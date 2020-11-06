import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ApiRest} from '../API-REST/API.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user;
  constructor(private apiRest: ApiRest, private  router: Router) {
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.apiRest.getDataUsuario(this.apiRest.returnIdUser()).subscribe((data2: {}) => {
      this.user = data2[0];
      console.log('data', data2);
    });
  }
  Modificar(){
    this.router.navigate(['./modificarPerfil']);
  }
}
