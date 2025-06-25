import { api_url } from 'src/app/core/custom_injection/api_url';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly httpClient:HttpClient, @Inject(api_url) private apiPath:string) { }

  getAllBrands() {
    return this.httpClient.get(`${this.apiPath}/api/v1/brands`);
  }
}
