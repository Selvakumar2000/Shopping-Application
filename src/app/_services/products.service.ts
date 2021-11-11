import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Products } from '../_models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL = environment.apiUrl;

  products: Products[] = [];
  paginatedResult: PaginatedResult<Products[]> = new PaginatedResult<Products[]>();
  
  constructor(private http: HttpClient) { }

  getProducts(category: string, page: number, itemsPerPage: number)
  {
    let params = new HttpParams();

    if(page !== null && itemsPerPage !== null && category !== null)
    {
      params = params.append('category', category);
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Products[]>(
                     this.baseURL + 'products', {observe:'response',params}
                                    )
    .pipe(map(response => {

        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null)
        {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      }));
  }

}
