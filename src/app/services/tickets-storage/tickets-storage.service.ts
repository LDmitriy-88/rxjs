import { Injectable } from '@angular/core';
import { ITour } from 'src/app/models/tours';

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {

  constructor() { }

  private ticketStorage: ITour[]
 
 
 
  setStorage(data: ITour[]): void {
   // запись данных в this.ticketStorage
   this.ticketStorage = data;
  }
  getStorage(): ITour[] {
    return this.ticketStorage;
     // возвращает в this.ticketStorage
  }





}
