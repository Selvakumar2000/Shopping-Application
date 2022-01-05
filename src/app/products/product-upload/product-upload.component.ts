import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ProductUpload } from 'src/app/_models/productUpload';
import { AccountService } from 'src/app/_services/account.service';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  category: string;
  user: any;
  productDetails: ProductUpload = new ProductUpload();
  file: File;
  fileName: string;
  fileSize: number = 0;
  canUpload: boolean = true;
  imageFile: any;
  @ViewChild('detailsForm') detailsForm: NgForm;
  
  constructor(private accountService: AccountService, private router: Router,
              private route: ActivatedRoute, private productService: ProductsService,
              private toastr: ToastrService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })

    this.route.params.subscribe((data:Params) => {
      this.category = data['product']
    });

   }

   cursorClass = {
    "cursor-allowed" : this.canUpload,
    "cursor-notallowed" : !this.canUpload
   }

  ngOnInit(): void {
    this.productDetails.category = this.category;
    this.productDetails.discount = 0;
  }

  getImgDetails(imageInput: any)
  {
    this.fileName = imageInput.files[0].name;
    this.fileSize = imageInput.files[0].size;
    this.canUpload = !this.canUpload;
  }

  processDetails(imageInput: any) 
  {
    this.file = imageInput.files[0];
    this.productService.uploadDetails(this.productDetails, this.file).subscribe(response => {
        this.toastr.success('Product Added Successfully');
        this.resetForm();
    });
  }

  logout(username: string)
  {
    this.accountService.logout(username);
    this.router.navigateByUrl('/');
  }

  resetForm()
  {
    this.detailsForm.reset();
    this.canUpload = !this.canUpload;
    this.fileSize = 0;
    this.fileName = "";
  }

}