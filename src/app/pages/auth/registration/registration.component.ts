import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
login: string;
psw: string;
pswRepeat: string;
email: string;
cardNumber: string;

  constructor() { }

  ngOnInit(): void {
  }


  registration(ev: Event):void{

  }
}
