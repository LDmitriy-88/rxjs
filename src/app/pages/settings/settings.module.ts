import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { StatisticComponent } from './statistic/statistic.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent],
  
/*   exports: [
        SettingsComponent
    ], */
  
  imports: [
    CommonModule,
    SettingRoutingModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
    TableModule
  ]
})
export class SettingsModule { }