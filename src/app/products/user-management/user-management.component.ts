import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { UpdateDetails } from 'src/app/_models/updateDetails';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  @ViewChild('userdetailsForm') userdetailsForm: NgForm;
  userRole: string;
  userDetails: UpdateDetails = new UpdateDetails();
  userRoles: any;
  fileName: string = null;
  fileSize: number = 0;
  file: boolean = false;
  buyerRoles = [{ value: 'Buyer', display: 'Buyer' },
           { value: 'GoldBuyer', display: 'GoldBuyer' }];

  supplierRoles = [{ value: 'Supplier', display: 'Supplier' },
                   { value: 'GoldSupplier', display: 'GoldSupplier' }];


  constructor(private accountService: AccountService, private usersService: UserService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.userRole = response.userRole;
    })
   }

  ngOnInit(): void {
    if(this.userRole == 'Buyer' || this.userRole == 'GoldBuyer')
    {
      this.userRoles = this.buyerRoles;
    }
    if(this.userRole == 'Supplier' || this.userRole == 'GoldSupplier')
    {
      this.userRoles = this.supplierRoles;
    }

    this.getUserDetails();
  }

  getUserDetails()
  {
    this.usersService.getUserDetails().subscribe(response => {
      this.userDetails = response;
    });
  }

  updateDetails(imageInput: any)
  {
    this.usersService.updateUserdetails(this.userDetails, imageInput.files[0])
                     .subscribe(response => {
      this.userDetails = response;
      this.userdetailsForm.reset();
      this.toastr.success('Profile Updated Successfully');
      this.fileSize = 0;
      this.fileName = null;
      this.getUserDetails();
    })
  }

  processFile(imageInput: any)
  {
    this.fileName = imageInput.files[0].name;
    this.fileSize = imageInput.files[0].size;
    this.file = !this.file;
  }

}
