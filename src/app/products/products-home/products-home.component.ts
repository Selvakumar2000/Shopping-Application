import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  products: string[] = ['Dressess', 'Shoes', 'Watches', 
                        'Mobile Phones', 'Mobile Accessories', 'Footwear',
                        'Refrigerators', 'LED TVs', 'Washing Machines'];

  ngOnInit(): void {
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }

  getProducts(product: string)
  {
    this.router.navigate(['/products', product]);
  }

}
