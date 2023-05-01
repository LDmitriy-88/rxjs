import { Component } from '@angular/core';
import { ObservableExampleService } from './services/test/observable-example.service';
import { ConfigService } from './services/configService/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;
  constructor(private test: ObservableExampleService,
    private config: ConfigService){
    test.initObservable()
  }

ngOnInit(){
this.config.configLoad();

const myObservable = this.test.getObservable();
myObservable.subscribe((data) => {
  console.log('first myObservable data', data)
});

myObservable.subscribe((data) => {
  console.log('second myObservable data', data)
});

const mySubject = this.test.getSubject();

mySubject.subscribe((data) => {
  /*console.log('first data subject', data)*/
});

mySubject.subscribe((data) => {
  /*console.log('second data subject', data)*/
});

mySubject.next('subject value');

mySubject.next('subject value');




const myBehavior = this.test.getBehaviorSubject();
myBehavior.subscribe((data) =>{
  console.log('first data behaviorSubject', data)
});

myBehavior.next('new data from behaviorSubject');
myBehavior.next('new data1 from behaviorSubject');

}



}
