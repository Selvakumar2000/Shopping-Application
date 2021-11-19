import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Products } from '../_models/products';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  //Add to cart
  addToCart(product: Products)
  {
    return this.http.post(this.baseURL + 'ordermanagement/addto-cart', product, {responseType: 'text'});
  }

  //Get Cart Products
  getCartProducts()
  {
    return this.http.get<Products[]>(this.baseURL + 'ordermanagement/get-products');
  }
}
