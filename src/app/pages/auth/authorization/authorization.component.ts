import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/models/users';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/models/error';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
  
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputProp = 'test';
  @Input() inputObj: any;
  loginText ='Логин';
  pswText ='Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;


  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private http: HttpClient){ }

  ngOnInit(): void {
    console.log('init');
    this.authTextButton ="Авторизоваться";
  }
  ngOnDestroy(): void {  
    
    console.log('destroy');}

  ngOnChanges(changes: SimpleChanges): void {  console.log('changes', changes)}

  vipStatusSelect(): void{
    if (this.selectedValue){

    }
  }


  

onAuth(ev: Event): void {

  const authUser: IUser = {
    psw: this.psw,
    login: this.login,
    cardNumber: this.cardNumber
  }

  this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data) => {
 
  authUser.id = data.id;
  this.userService.setUser(authUser);
  const token: string = data.access_token;
  this.userService.setToken(token);
  this.userService.setToStore(token);


  this.router.navigate(['tickets/tickets-list']);

}, (err: HttpErrorResponse)=> {
  const serverError= <ServerError>err.error;
  this.messageService.add({severity:'warn', summary:serverError.errorText});
});


  /*
  if (this.authService.checkUser(authUser)){
    this.router.navigate(['tickets/tickets-list']);

    this.userService.setToken('user-private-token');
    this.userService.setUser(authUser);

  } else{
    console.log('auth false')
    this.messageService.add({severity:'error', summary:'Вы не зарегистрированы'});
  }
  */
}


}
