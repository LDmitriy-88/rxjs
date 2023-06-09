import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import { Router} from "@angular/router";
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
import {debounceTime, fromEvent, Subject, Subscription, takeUntil} from "rxjs";
import { ConfigService } from 'src/app/services/configService/config.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];
  renderComplete = false;
  private tourUnsubscriber: Subscription

  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;
  arr: string;
  destroyer = new Subject();
  config: any = ConfigService.config;


  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService
  
             ) { }

  //Подписаться на изменения, которые произойдут при запросе на сервер, параметром передается асинхронная операция (data)
  ngOnInit(): void {


    //формирование подписки
    this.ticketService.ticketUpdateSubject$.pipe(takeUntil(this.destroyer)).subscribe((data) => {
      this.tickets = data; //обновление значений
    })

    this.ticketService.getAllTours().subscribe(
      (data) => {
        this.tickets = data; //вставка нового шаблона
        this.ticketsCopy = [...this.tickets] //содержит все данные
        this.ticketStorage.setStorage(data); // запрос на тур записывается

      }
    )
    //сформировать подписку на ticketSubject
    //1 вариант
     this.ticketService.ticketType$.pipe(takeUntil(this.destroyer)).subscribe((data: ITourTypeSelect) => {
      console.log('data', data)
    //2 вариант
    //this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)  });
    // в методе подписки на изменение типа тура добавлена логика обработки данных
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      //this.tickets добавлен метод директивы
      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
  }
  ngAfterViewInit(){
    const fromEventOberver = fromEvent(this.ticketSearch.nativeElement, "keyup")
     fromEventOberver.pipe(
       debounceTime(200),
       takeUntil(this.destroyer)
     ).subscribe((ev: any) => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => {
            //проверка на строку, ищет при всех регистрах
            const nameToLower = typeof (el?.name) === "string" ? el.name.toLowerCase(): '';
            return nameToLower.includes(this.ticketSearchValue.toLowerCase());
          });
        } else {
          this.tickets = [...this.ticketsCopy]
        }
      }
    );
  }
  //выполняется отписка
  ngOnDestroy() {
       this.destroyer.next(true);
       this.destroyer.complete();

  }


  goToTicketInfoPage(item: ITour){
    this.router.navigate([`/tickets/ticket/${item._id}`])
  }

  directiveRenderComplete(ev: boolean){
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #f5f5dc')
    this.blockDirective.initStyle(0)
    this.renderComplete = true
  }
// поиск туров
  findTours(ev: Event):void{
    const searchValue = (<HTMLInputElement>ev.target).value;

    if(searchValue){
      this.tickets = this.ticketsCopy.filter((el) => el.name.includes(searchValue));
    }
    else {
      this.tickets = [...this.ticketsCopy]
    }
  }

}















/*

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour,ITourTypeSelect } from 'src/app/models/tours';
import { ActivatedRoute, Router } from '@angular/router';
ccccccccccccccccccccccccccccccccccccccccccccccccccc
import { Subscription, from, fromEvent, debounceTime } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];
  

  loadCountBlock = false;
  defaultDate: string;
 

  @ViewChild('tourWrap',{read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;


  tourUnsubscriber: Subscription;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketService,
    private router: Router,
    private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.ticketUpdateSubject$.subscribe((data) =>{
      this.tickets = data;
      }
    )

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {  
      setTimeout(() => {
 
     this.blockDirective.updateItems();

      this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
    });
  console.log('********data****', data)
    switch (data.value) {
      case "single":
        this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
        break;
      case "multi":
        this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
        break;
      case "all":
        this.tickets = [...this.ticketsCopy];
        break;
    
    }
    
    if (data.date) {
      const dateWithoutTime = new Date(data.date).toISOString().split('T');
      const dateValue = dateWithoutTime[0]
      console.log('dateValue',dateValue)
      this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
    }
  }
    );

  }


  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
   }




  ngAfterViewInit(){
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true})
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev:any) =>{
        if(this.ticketSearchValue){
          this.tickets = this.ticketsCopy.filter((el: ITour) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else{
          this.tickets = [...this.ticketsCopy];
        }
      });
  }

  goToTicketInfoPage(item: ITour){
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean){
    this.blockDirective.initStyle(0)
  }

  getTickets(){
    this.ticketService.getTickets().subscribe(
      (data) => {
         this.tickets = data;
         this.ticketsCopy = [...this.tickets];
         this.ticketStorage.setStorage(data);
    }
  )
}


}*/
