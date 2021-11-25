import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/_models/products';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-products-uploaded',
  templateUrl: './products-uploaded.component.html',
  styleUrls: ['./products-uploaded.component.css']
})
export class ProductsUploadedComponent implements OnInit {

  products: any;
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getUploadedProducts();
  }

  getUploadedProducts()
  { 
    this.productsService.getUploadedProducts().subscribe(response => {
      this.products = response;
    });
  }

}