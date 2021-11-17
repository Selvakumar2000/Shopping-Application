import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs/operators';
import { Login } from 'src/app/_models/login';
import { Products } from 'src/app/_models/products';
import { ProductUpload } from 'src/app/_models/productUpload';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  category: string;
  user: User;
  productDetails: ProductUpload = new ProductUpload();
  file: File;
  fileName: string;
  fileSize: number;
  canUpload: boolean = true;

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

  ngOnInit(): void {
    this.productDetails.category = this.category;
  }

  getImgDetails(imageInput: any)
  {
    this.fileName = imageInput.files[0].name;
    this.fileSize = imageInput.files[0].size;
    this.canUpload = false;
  }

  processDetails(imageInput: any) 
  {
    this.file = imageInput.files[0];
    this.productService.uploadDetails(this.productDetails, this.file).subscribe(response => {
        console.log(response);
        this.toastr.success('Product Added Successfully');
        this.canUpload = true;
    });
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}

