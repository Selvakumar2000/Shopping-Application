import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { productDetails } from 'src/app/_models/productDetails';
import { AccountService } from 'src/app/_services/account.service';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-products-uploaded',
  templateUrl: './products-uploaded.component.html',
  styleUrls: ['./products-uploaded.component.css']
})
export class ProductsUploadedComponent implements OnInit {

  products: any;
  name: any;
  description: any;
  amount: any;
  discount: any;
  quantity: any;
  brand: any;
  photo: any;
  @Input() sidebarstatus: boolean;
  @ViewChild('productdetailsForm') productdetailsForm: NgForm;
  display: boolean = true;
  productRemove: boolean = false;
  productForm: productDetails = new productDetails();

  constructor(private productsService: ProductsService, private toastr: ToastrService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUploadedProducts();
  }

  getUploadedProducts()
  { 
    this.productsService.getUploadedProducts().subscribe(response => {
      this.products = response;
    });
  }

  editProduct(event: any)
  {
    this.productForm = event;
    this.name = event.productName;
    this.description = event.productDescription;
    this.photo = event.photoUrl;
    this.brand = event.productBrand;
    this.amount = event.amountRs;
    this.discount = event.discount;
    this.quantity = event.quantity;
    this.display = false;
    this.productRemove = true;
  }

  updateProductDetails()
  {
    this.productForm.discount = Number(this.productForm.discount);
    this.productForm.amountRs = Number(this.productForm.amountRs);
    this.productForm.quantity = Number(this.productForm.quantity);
    this.productsService.updateProductDetails(this.productForm).subscribe(response => {
      this.toastr.success('Product Details Updated Successfully');
      this.display = true;
      this.productRemove = false;
      this.getUploadedProducts();
    });
  }

  deleteProduct()
  {
    this.accountService.confirm(2).subscribe(result => {
      if(result)
      {
        this.productsService.deleteProduct(this.productForm.productId).subscribe(response => {
          this.toastr.info('Product Removed Successfully');
          this.display = true;
          this.productRemove = false;
          this.getUploadedProducts();
        });
      }
    });
  }

}