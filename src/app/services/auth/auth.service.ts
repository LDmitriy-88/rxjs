import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] =[];

  constructor() { }

  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el:IUser) => el.login ===user.login);
    if (isUserExists){
      return isUserExists.psw === user.psw;
    }
    return false;
  }

  setUser(user: IUser): void{
    const isUserExists = this.usersStorage.find((el:IUser) => el.login ===user.login);
    if (!isUserExists && user?.login){
      this.usersStorage.push(user);
    }
  }


}
