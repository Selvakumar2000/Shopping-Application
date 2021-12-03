import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = environment.apiUrl;
  
  currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(model: any)
  {
    return this.http.post(this.baseURL + 'account/Register', model).pipe(
      map((user: any)=>   
      {
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  login(model: any)
  {
    return this.http.post(this.baseURL + 'account/Login', model).pipe(
      map((response: any)=>   
      {
        const user = response;
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
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

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}