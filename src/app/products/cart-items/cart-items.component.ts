import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/_models/products';
import { OrderManagementService } from 'src/app/_services/order-management.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  products: any;
  @Input() sidebarstatus: boolean;
  constructor(private orderManagement: OrderManagementService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts()
  {
    this.orderManagement.getCartProducts().subscribe(response => {
      this.products = response;
    });
  }

  removeCartProduct(event: any)
  {
    this.orderManagement.removeCartProduct(event.productId).subscribe(response =>
    {
      this.toastr.success('Product Removed From Your Cart');
      this.getCartProducts();
    });
  }

}
