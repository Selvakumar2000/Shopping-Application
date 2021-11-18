import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  products: string[] = ['Dresses', 'Shoes', 'Watches', 
  'Mobile Phones', 'Mobile Accessories', 'Footwears',
  'Refrigerators', 'LED TVs', 'Washing Machines'
 ];

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
  }

  ngOnInit(): void {
  }

  gotoProducts(product: string)
  {
    if(this.user.userRole == 'Buyer' || this.user.userRole == 'GoldBuyer')
    {
      this.router.navigate(['/products/display', product]);
    }

    if(this.user.userRole == 'Supplier' || this.user.userRole == 'GoldSupplier')
    {
      this.router.navigate(['/products/upload', product]);
    }
    
  }

}
