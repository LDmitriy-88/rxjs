import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { ITour } from 'src/app/models/tours';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { BlocksStyleDirective } from 'src/app/directive/blocks-style.directive';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];

  @ViewChild('tourWrap',{read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketService,
    private router: Router,
    private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) =>{
        this.tickets = data;
        this.ticketStorage.setStorage(data);

      }
    )
  }

  ngAfterViewInit(){
    this.tourWrap
  }

  goToTicketInfoPage(item: ITour){
    this.router.navigate(['/tickets/ticket/${item.id}'])
  }

  directiveRenderComplete(ev: boolean){
    this.blockDirective.initStyle(0)
  }

}
