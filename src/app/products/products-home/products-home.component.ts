import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
  }

  products: string[] = ['Dresses', 'Shoes', 'Watches', 
                        'Mobile Phones', 'Mobile Accessories', 'Footwears',
                        'Refrigerators', 'LED TVs', 'Washing Machines'];

  ngOnInit(): void {
  }

  hasvalue: boolean =false;
  imgUrl: string = "./assets/profile.jpg";
  showPanel()
  {
    this.hasvalue = !this.hasvalue 
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
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
