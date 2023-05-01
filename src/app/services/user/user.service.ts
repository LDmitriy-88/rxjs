import { Injectable } from '@angular/core';
import { window } from 'rxjs';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  private token: string;

  constructor() { }





 public getUser() { 

  return this.user || [];
 };


 public setUser(user: IUser) {

  this.user = user;

 	// записывается пользователь в this.user 
 }


getToken(): string | null{
  return this.token /*|| window.localStorage.getItem('Token')*/
};

setToken(token: string): void{
  this.token = token;
  /*window.localStorage.setItem('Token', (token))*/
 };


}