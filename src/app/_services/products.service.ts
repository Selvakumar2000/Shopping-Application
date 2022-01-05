import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { productDetails } from '../_models/productDetails';
import { Products } from '../_models/products';
import { ProductUpload } from '../_models/productUpload';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  //get products
  getProducts(category: string,  gender: string, minPrice: number,
              maxPrice: number, page: number, itemsPerPage: number)
  {
    let params = new HttpParams();

    params = params.append('category', category);
    params = params.append('gender', gender);
    params = params.append('minPrice', minPrice.toString());
    params = params.append('maxPrice', maxPrice.toString());
    params = params.append('pageNumber', page.toString());
    params = params.append('pageSize', itemsPerPage.toString());

    return this.http.get(this.baseURL + 'products', {observe: 'response', params});
  }

  //upload product
  uploadDetails(productDetails: ProductUpload, image: File)
  {
    const formData = new FormData();

    formData.append('productDetails', JSON.stringify(productDetails));
    formData.append('file', image);
    
    return this.http.post(this.baseURL + 'products/upload-product', formData,
    {responseType: 'text'});
  }

  //Get Uploaded ProductDetails
  getUploadedProducts()
  {
    return this.http.get(this.baseURL + 'products/uploadedproducts');
  }

  updateProductDetails(product: productDetails)
  {
    return this.http.put(this.baseURL + 'products/updateproduct', product, {responseType: 'text'});
  }

  deleteProduct(id: any)
  {
    return this.http.delete(this.baseURL + 'products/deleteProduct/' + id, {responseType: 'text'});
  }
  
}
