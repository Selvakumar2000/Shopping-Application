import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Products } from 'src/app/_models/products';
import { AccountService } from 'src/app/_services/account.service';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  category: string;
  products: Products[] = [];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 4;

  constructor(private route: ActivatedRoute, private productService: ProductsService,
              private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((data:Params) => {
      this.category = data['product']
    });

    this.getProducts();

  }

  getProducts()
  {
    this.productService.getProducts(this.category, this.pageNumber, this.pageSize)
                        .subscribe(response => {
      this.products = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event:any)
  {
    this.pageNumber=event.page;
    this.getProducts();
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  //filters
  openFilterOptions()
  {
    console.log('selva');
  }

}
