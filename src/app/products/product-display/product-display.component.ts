import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Pagination } from 'src/app/_models/pagination';
import { Products } from 'src/app/_models/products';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { OrderManagementService } from 'src/app/_services/order-management.service';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  userRole: string;
  category: string;
  products: Products[] = [];
  pagination: Pagination;
  pageNumber: number = 1;
  pageSize: number = 12;
  gender: string = 'male';
  minPrice: number =  1;
  maxPrice: number = 100000;

  constructor(private route: ActivatedRoute, private productService: ProductsService,
              private accountService: AccountService, private router: Router,
              public modalService: BsModalService, private orderManagement: OrderManagementService,
              private toastr: ToastrService) { 
                
      this.accountService.currentUser$.pipe(take(1)).subscribe((response: User) => {
        this.userRole = response.userRole;
      })    
      
  }

  ngOnInit(): void {

    this.route.params.subscribe((data:Params) => {
      this.category = data['product']
    });

    this.getProducts();

  }

  getProducts()
  {
    this.productService.getProducts(this.category, this.gender, this.minPrice, 
                                    this.maxPrice, this.pageNumber, this.pageSize )
                       .subscribe(response => { 
      this.products = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event:any)
  {
    this.pageNumber = event.page;
    this.getProducts();
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  //filter modal
  genderList = [
    { value: 'male', display: 'Men' },
    { value: 'female', display: 'Women' },
    { value: 'kids', display: 'Kids' },
  ];

  config: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-dialog-centered'
  };

  modalRef?: BsModalRef;
  openFilterOptions(staticModal: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(staticModal,this.config);
  }

  reset()
  {
    this.pageNumber = 1;
    this.pageSize = 12;
    this.gender = 'male';
    this.minPrice =  1;
    this.maxPrice = 100000;

    this.modalRef.hide();
    this.getProducts();
  }

  addtoCart(product: Products)
  {
    this.orderManagement.addToCart(product).subscribe(response => {
      if(response)
      {
        let responseStr = JSON.stringify(response);
        let result = responseStr.split(" ")[0];
        
        if(result == '"Product')
        {
          this.toastr.success(response);
        }
        if(result == '"This')
        {
          this.toastr.warning(response);
        }
      } 
    });
  }
}