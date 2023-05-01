import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INearestTour, ITour, ITourLocation,ICustomTicketData } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { TicketsStorageService } from 'src/app/services/tickets-storage/tickets-storage.service';
import { Observable, forkJoin, fromEvent } from 'rxjs';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { Subscription } from 'rxjs';
import { ElementRef } from '@angular/core';
import { TicketRestService } from 'src/app/services/rest/ticket-rest.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;
ticketSearchValue: string;
  nearestTours:INearestTour[];
  toursLocation: ITourLocation[];
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1,2,3];

  constructor(
      private route: ActivatedRoute,
      private ticketStorage: TicketsStorageService,
      private userService: UserService,
      private ticketService: TicketService,
      private ticketServiceRest: TicketRestService) { }

  
  
  
     ngOnInit(): void {


this.user = this.userService.getUser()

this.userForm = new FormGroup({

  firstName: new FormControl('', {validators: Validators.required}),
  lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
  cardNumber: new FormControl(this.user?.cardNumber),
  birthDay: new FormControl(),
  age: new FormControl(),
  citizen: new FormControl()
});


forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) =>{
  this.nearestTours = this.ticketService.transformData(data[0], data[1]);
  this.toursLocation = data[1];
})




const routeIdParam = this.route.snapshot.paramMap.get('id');
const queryIdParam = this.route.snapshot.queryParamMap.get('id');
const paramValueId = routeIdParam || queryIdParam;



if (paramValueId) {
  const ticketStorage = this.ticketStorage.getStorage();
  this.ticket = ticketStorage.find((el) => el.id === paramValueId);
  console.log('this.ticket', this.ticket)
}

  }

ngAfterViewInit(): void{
  this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);


  const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
  this.searchTicketSub = fromEventObserver.subscribe((any) =>{
    this.initSearchTour();
  })
}

ngODestroy(): void{
  this.searchTicketSub.unsubscribe();
}


initSearchTour(): void{
  const type = Math.floor(Math.random()*this.searchTypes.length);

  if (this.ticketRestSub && !this.searchTicketSub.closed){
    this.ticketRestSub.unsubscribe();
  }

  this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) =>{
    this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
  })

}

transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[]{
    const newTicketData: ICustomTicketData[]=[];
    data.forEach((el) =>{
      const newEl = <ICustomTicketData> {...el};
      newEl.region =<ICustomTicketData>regions.find((region) => el.locationId);
        newTicketData.push(newEl);
    });
    return newTicketData;
  }

getRandomNearestEvent(type: number): Observable<INearestTour>{
  return this.ticketServiceRest.getRandomNearestEvent(type)
}




onSubmit(): void{


}


initTour(): void{
const userData = this.userForm.getRawValue();
const postData = {...this.ticket, ...userData};

this.ticketService.sendTourData(postData).subscribe()



}
selectDate(ev: Event): void{}


}
