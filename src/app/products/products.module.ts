import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductDisplayComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()
  ]
})
export class ProductsModule { }
