import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  insertCustomer;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.insertCustomer = this.formBuilder.group({
      nombre: '',
      email: '',
      password: ''
    });
  }
  ngOnInit(): void {
  }
}
