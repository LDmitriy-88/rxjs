import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }



private user: IUser;


 public getUser() { 

  return this.user;
 };


 public setUser(user: IUser) {

  this.user = user;

 	// записывается пользователь в this.user 
 }

}