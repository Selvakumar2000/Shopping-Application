import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    HomeComponent,
    TextInputComponent,
    DateInputComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class HomepageModule { }
