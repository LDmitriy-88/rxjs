import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/models/users';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit {
  loginText ='Логин';
  pswText ='Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authTextButton ="Авторизоваться";
  }

  vipStatusSelect(): void{
    if (this.selectedValue){

    }
  }

onAuth(ev: Event): void {
  const authUser: IUser = {
    psw: this.psw,
    login: this.login
  }
  if (this.authService.checkUser(authUser)){
    console.log('auth true')

  } else{
    console.log('auth false')
  }
}


}
