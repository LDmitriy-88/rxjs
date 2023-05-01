import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable,Subject, map } from 'rxjs';
import { INearestTour, ITour, ITourLocation, ITourTypeSelect, ICustomTicketData } from 'src/app/models/tours';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject = new Subject<ITourTypeSelect>() 
  readonly ticketType$ = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService,
    private http: HttpClient) { }


  getTickets(): Observable<ITour[]>{
    return this.ticketServiceRest.getTickets().pipe(map(
      (value: ITour[]) =>{
          const singleTours = value.filter((el) => el.type === "single");
          return value.concat(singleTours);
}


    ));
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable(); 
   }
    
   updateTour(type:ITourTypeSelect): void {
     this.ticketSubject.next(type);
   }


   getError(): Observable<string>{
    return this.ticketServiceRest.getRestError()

  }

    getNearestTours(): Observable<INearestTour[]>{
      return this.ticketServiceRest.getNearestTickets();
    }

    getToursLocation(): Observable<ITourLocation[]>{
      return this.ticketServiceRest.getLocationList();
    }
/*
    getRandomNearestEvent(type: number): Observable<INearestTour>{
      switch(type){
        case 0:
          return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json');
          case 1:
            return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');
            case 2:
              return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json');
              default:
                return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');
      }
    }
*/

transformData (data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[]{
  const newTicketData: ICustomTicketData[] = [];
  data.forEach((el) => {
    const newEl = <ICustomTicketData> {...el};
    newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
    newTicketData.push(newEl);
  });
  return newTicketData;
}

    getRandomNearestEvent(type: number): Observable<INearestTour>{
      return this.ticketServiceRest.getRandomNearestEvent(type);
    }

sendTourData(data: any): Observable<any>{
  return this.ticketServiceRest.sendTourData(data);
}

}
