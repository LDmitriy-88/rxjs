import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-change-password',

  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPsw : string;
  newPsw: string;
  newPswRepeat: string;

  constructor(private messageService: MessageService,
              private userService: UserService) { }

  ngOnInit(): void {
  }



  changePsw(): void | boolean{

if (this.newPsw != this.newPswRepeat){
  this.messageService.add({key: 'pass-err', severity: 'error', summary: 'Новый пароль такой же как старый!'});
  return false
} else {
  this.messageService.add({key:'pass-ok', severity:'success', summary: 'Пароль успешно изменён'});
  const user = this.userService.getUser();
  const newUser = {...user};
  newUser.psw = this.newPsw
  this.userService.setUser(newUser);
  return false
}

}


}
