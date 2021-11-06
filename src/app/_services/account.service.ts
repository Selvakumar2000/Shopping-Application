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
  
  private currentUserSource=new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(model:any)
  {
    return this.http.post(this.baseURL + 'account/Register', model).pipe(
      map((user:User)=>   
      {
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  login(model:any)
  {
    return this.http.post(this.baseURL + 'account/Login', model).pipe(
      map((response: User)=>   
      {
        const user=response;
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user:User)
  {
    user.roles = [];
    //role is may be an array or string
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles); 
    //convert the object data into the JSON format   setItem(key,value);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getDecodedToken(token)
  {
    return JSON.parse(atob(token.split('.')[1])); //access the payload
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

 

}
