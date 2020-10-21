import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-option-menu',
  templateUrl: './OptionMenu.component.html',
  styleUrls: ['./OptionMenu.component.css']
})
export class OptionMenuComponent implements OnInit{
  sticky: boolean = false;
  @ViewChild('stickyMenu2') menuElement: ElementRef;
  elementPosition: any;
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
  constructor() {
  }
  ngOnInit(): void {
  }
}
