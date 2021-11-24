import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateDetails } from '../_models/updateDetails';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiUrl;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getUserDetails()
  {
    return this.http.get<UpdateDetails>(this.baseURL + 'users/userdetails');
  }

  updateUserdetails(model: any, image: File)
  {
    const formData = new FormData();

    formData.append('userDetails', JSON.stringify(model));
    formData.append('file', image);

    return this.http.put<UpdateDetails>(this.baseURL + 'users/updatedetails', formData);
  }

  photoUrl: any;
  setPhotoUrl(photoUrl: any)
  {
    this.photoUrl = photoUrl;
  }

  getPhotoUrl()
  {
    return this.photoUrl;
  }

}
