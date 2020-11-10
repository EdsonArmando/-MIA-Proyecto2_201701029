import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiRest} from '../API-REST/API.service';


@Component({
  selector: 'app-denuncias-component',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
  export class DenunciasComponent implements OnInit{
  Denuncias;
  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRest,
  ) {
  }
  ngOnInit(): void {
    this.apiRest.getDenuncias().subscribe((data: {}) => {
      this.Denuncias = data;
    });
  }
  hola(id){
    this.apiRest.deleteProduct(id)
      .subscribe(res => {
          console.log('eliminado');
        }, (err) => {
          console.log(err);
        }
      );
  }
}
