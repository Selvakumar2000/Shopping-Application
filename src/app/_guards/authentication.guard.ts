import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  user: any;
  
  constructor(private accountService: AccountService, private toastr: ToastrService,
    private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
    })
  }
 
  canActivate(): boolean {
    if(this.user)
    {
      return true;
    } 

    this.toastr.error('Registered Users Only Allowed');
    this.router.navigateByUrl('/');
    return false;
  }
  
}
