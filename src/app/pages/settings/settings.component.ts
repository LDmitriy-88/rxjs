import {Component, OnDestroy, OnInit} from '@angular/core';
import { ObservableExampleService } from 'src/app/services/test/observable-example.service';
import {Subject, Subscription, take, takeUntil} from "rxjs";
import { SettingsService } from 'src/app/services/settings/settings.service';
import { StatisticComponent } from './statistic/statistic.component';
@Component({
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
/*   private subjectScope: Subject<string>;
  private  subjectUnsubscribe: Subscription;
  settingsData: Subscription;
  settingsDataSubject: Subscription; */
  private subjectForUnsubscribe = new Subject()


  constructor(
    private testing: ObservableExampleService,
    private settingsService: SettingsService) {}

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) =>{console.log('settings data', data)});
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
    (data) => {
        console.log('settings data from subject', data)
      })

  }
  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
    // this.settingsData.unsubscribe();
    // this.subjectUnsubscribe.unsubscribe()
  }
}