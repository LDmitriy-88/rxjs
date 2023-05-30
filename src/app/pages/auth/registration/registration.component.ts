import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from 'src/app/services/configService/config.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/models/error';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
login: string;
psw: string;
pswRepeat: string;
email: string;
cardNumber: string;
selectedValue: boolean;
saveUserInStore: boolean;
showCardNumber: boolean;

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private http: HttpClient){ }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }


  sendToLocal(): void{
    if (this.selectedValue){

    }
  }



  registration(ev: Event):void | boolean{





    

   if(this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }


const userObj: IUser = {
  psw: this.psw,
  cardNumber: this.cardNumber,
  login: this.login,
  email: this.email
}

this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
  if (this.saveUserInStore) {
    const objUserJsonStr = JSON.stringify(userObj);
    window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
  }
  this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});

}, (err: HttpErrorResponse)=> {
  console.log('err', err)
  const serverError =<ServerError>err.error
  this.messageService.add({severity:'warn', summary: serverError.errorText});
});


/*
this.http.post('http://localhost:3000/users/', userObj).subscribe(() =>{})

if (!this.authService.isUserExists(userObj)){
this.authService.setUser(userObj);
this.messageService.add({severity:'success', summary:'Красавчик!'});
if(this.selectedValue){
  window.localStorage.setItem(`userData${userObj.login}`, userObj.toString());
}

  } else{
    this.messageService.add({severity:'warn', summary:'Ты уже с нами, бро'});
  }*/

}

/*  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}*/


}
