import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketInfoRoutingModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    CarouselModule,
    FormsModule

  ]
})
export class TicketInfoModule { }
