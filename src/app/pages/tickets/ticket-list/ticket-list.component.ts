import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour,ITourTypeSelect } from 'src/app/models/tours';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';
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
    this.ticketService.getTickets().subscribe(
      (data) =>{
        this.tickets = data;
        this.ticketsCopy = [...data];
        this.ticketStorage.setStorage(data);

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


}
