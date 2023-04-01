import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

textProp = 'string'

someObj: any;
obj = {a: 1};


  constructor() { }


  
  ngOnInit(): void {  
    
    this.someObj = this.obj;
  }


  changeProp() {  
    this.someObj = {a:1};  
  const  randIndex = Math.random()  
  this.textProp = "newValue"+randIndex  // this.textProp = "someeedf";
}


}
