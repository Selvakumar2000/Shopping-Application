import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/_models/products';
import { OrderManagementService } from 'src/app/_services/order-management.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  products: any;

  constructor(private orderManagement: OrderManagementService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts()
  {
    this.orderManagement.getCartProducts().subscribe(response => {
      this.products = response;
    });
  }

}
