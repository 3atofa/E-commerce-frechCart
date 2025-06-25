import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url } from 'src/app/core/custom_injection/api_url';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient:HttpClient, @Inject(api_url) private apiPath:string) { }

  getAllProducts():Observable<any>
  {
    return this.httpClient.get(this.apiPath + "/api/v1/products")
  }

  getSpecificProducts(id:string | null):Observable<any>
  {
    return this.httpClient.get(`${this.apiPath}/api/v1/products/${id}`)
  }

}
