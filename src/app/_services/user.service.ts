import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdateDetails } from '../_models/updateDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

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

}
