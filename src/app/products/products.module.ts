import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsUploadedComponent } from './products-uploaded/products-uploaded.component';
import { OrdersComponent } from './orders/orders.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { GiftsComponent } from './gifts/gifts.component';
import { HelpComponent } from './help/help.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DisplayGoodsComponent } from './display-goods/display-goods.component';

@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductDisplayComponent,
    ProductUploadComponent,
    UserManagementComponent,
    DashboardComponent,
    ProductsUploadedComponent,
    OrdersComponent,
    CartItemsComponent,
    TransactionsComponent,
    GiftsComponent,
    HelpComponent,
    FeedbackComponent,
    DisplayGoodsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
  ]
})
export class ProductsModule { }
