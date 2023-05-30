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


getToken(): string | any{
  return this.token || localStorage.getItem('Token')
  
};

setToken(token: string): void{
  this.token = token;
  
 };

 setToStore(token: string): void{
  localStorage.setItem('Token', token);
 }
}