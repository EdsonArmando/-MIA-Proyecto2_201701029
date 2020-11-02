import {Component, ElementRef, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ApiRest} from '../API-REST/API.service';

@Component({
  selector: 'app-option-menu',
  templateUrl: './OptionMenu.component.html',
  styleUrls: ['./OptionMenu.component.css']
})
export class OptionMenuComponent implements OnInit{
  sticky:boolean = false;
  @Input() idUser: number;
  @Input() login: boolean;
  constructor(private apiRest: ApiRest) {
    this.idUser = apiRest.returnIdUser();
  }
  @ViewChild('stickyMenu2') menuElement: ElementRef;
  elementPosition: any;
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(value){
    alert(value);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.elementPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  public hola(){
    this.login = true;
    this.idUser = this.apiRest.returnIdUser();
    this.ngOnInit();
  }
  public ngOnInit(): void {
    this.login = this.apiRest.login;
  }
}
