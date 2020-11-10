import {Component, OnInit} from '@angular/core';
import {products} from '../ListTemp';
import { ApiRest } from '../API-REST/API.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shoes-list',
  templateUrl: './shoes-list.component.html',
  styleUrls: ['./shoes-list.component.css']
})
export class ShoesListComponent implements OnInit{
  categoria;
  changeText: boolean;
  products = products;
  shoes;
  constructor(
    private apiRest: ApiRest,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoria = params.get('category');
    });
    this.changeText = false;
    if (this.categoria === 'Niño'){
      this.apiRest.getShoesBoy().subscribe((data: {}) => {
        this.shoes = data;
      });
    }else if (this.categoria === 'Niña'){
      this.apiRest.getShoesGirl().subscribe((data: {}) => {
        this.shoes = data;
      });
    }else if (this.categoria === 'Caballero'){
      this.apiRest.getShoesCaballero().subscribe((data: {}) => {
        this.shoes = data;
      });
    }else if (this.categoria === 'Dama'){
      this.apiRest.getShoes().subscribe((data: {}) => {
        this.shoes = data;
      });
    }else{
      this.apiRest.getProducts().subscribe((data: {}) => {
        this.shoes = data;
        console.log(data);
      });
    }
  }
}
