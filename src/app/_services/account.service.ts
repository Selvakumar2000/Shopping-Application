import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../homepage/confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  bsModalRef: BsModalRef;
  baseURL = environment.apiUrl;  
  currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router, public modalService: BsModalService) { }

  register(model: any)
  {
    return this.http.post(this.baseURL + 'account/register', model);
  }

  login(model: any)
  {
    return this.http.post(this.baseURL + 'account/login', model);
  }

  proceedlogin(model: any)
  {
    return this.http.post(this.baseURL + 'account/proceed', model);
  }

  ForgotPassword(model: any)
  {
    return this.http.post(this.baseURL + 'account/resetpasswordlink', model, {responseType: 'text'});
  }

  resetPassword(model: any)
  {
    return this.http.post(this.baseURL + 'account/resetpassword', model, {responseType: 'text'});
  }

  setCurrentUser(user: any)
  {
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(username: string)
  {
    this.logoutUser(username).subscribe(response => {
      console.log(response);
    });
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/'); 
  }

  logoutUser(username: string)
  {
    return this.http.get(this.baseURL + 'account/logout/'+username, {responseType: 'text'});
  }

  modalstate: any;
  confirm(i: number)
  {
    if(i == 1)
    {
      const initialState: ModalOptions = {
        backdrop:'static',
        keyboard:false,
        class: 'modal-dialog-centered',
        initialState: {
          title: 'Warning',
          message: 'There is another active session with the same credentials. ShopMe does not allow more than one active session per user. If you continue to login, the other session will be automatically logged out. Do you wish to continue to login?',
          btnOkText: 'YES',
          btnCancelText: 'NO'
        }
      };

      this.modalstate = initialState;
    }

    if(i == 2)
    {
      const initialState: ModalOptions = {
        backdrop:'static',
        keyboard:false,
        initialState: {
          title: 'Confirmation',
          message: 'Are you sure, you want to delete this product?',
          btnOkText: 'YES',
          btnCancelText: 'NO'
        }
      };

      this.modalstate = initialState;
    }
    

    this.bsModalRef =this.modalService.show(ConfirmDialogComponent, this.modalstate);
    return new Observable<boolean>(this.getResult());
  }

  private getResult()
  {
    return (observer) => {
      const subscription = this.bsModalRef.onHidden.subscribe(() => {
        observer.next(this.bsModalRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe()
        {
          subscription.unsubscribe();
        }
      }
    }
  }

  CheckUniqueID(uniqueID: string)
  {
    return this.http.get(this.baseURL + 'account/check/'+ uniqueID);
  }
}
