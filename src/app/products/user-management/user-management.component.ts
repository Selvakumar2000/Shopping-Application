import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { UpdatedDetails } from 'src/app/_models/updatedDetails';
import { AccountService } from 'src/app/_services/account.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  @Input() sidebarstatus: boolean;
  @ViewChild('userdetailsForm') userdetailsForm: NgForm;
  user: any;
  userDetails: UpdatedDetails = new UpdatedDetails();
  userRoles: any;
  fileName: string = null;
  fileSize: number = 0;

  constructor(private accountService: AccountService, private usersService: UserService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
   }

  ngOnInit(): void {
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
      this.user.photoUrl = this.userDetails.photoUrl;
      this.accountService.setCurrentUser(this.user)
    })
  }

  processFile(imageInput: any)
  {
    this.fileName = imageInput.files[0].name;
    this.fileSize = imageInput.files[0].size;
  }

}




