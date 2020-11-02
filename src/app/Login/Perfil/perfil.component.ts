import {Component, OnInit} from '@angular/core';
import { ApiRest } from '../../API-REST/API.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  idUser;
  constructor(
    private apiRest: ApiRest,
  ) {
  }
  ngOnInit(): void {

  }
}
