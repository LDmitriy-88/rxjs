
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IMenuType} from 'src/app/models/menuType';
import { ITour, ITourTypeSelect } from 'src/app/models/tours';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { TicketService } from 'src/app/services/tickets/ticket.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]



 @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  http: any;



  constructor(
    private ticketService: TicketService,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }


  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
}


initRestError(): void {
  this.ticketService.getError().subscribe((data) => {}, (err)=> {
    console.log('err', err)
  });
 }

 initSettingsData(): void{
  this.settingsService.loadUserSettingsSubject({
    saveToken: false
  })
 }

 initTours(): void {
  this.http.post("http://localhost:3000/tours/", '').subscribe((data: ITour[])=>{
    this.ticketService.updateTicketList(data);
  });
 }

 deleteTours(): void{
  this.http.delete('http://localhost:3000/tours').subscribe(()=>{
    this.ticketService.updateTicketList([]);
  });
 }


}