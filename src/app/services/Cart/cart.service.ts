import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)

  myToken = localStorage.getItem('userToken');

  cartNumber:WritableSignal<number> = signal(0);

  addToCart(id:string):Observable<any>
  { 
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
    {
      "productId": id
    }
  )
  }

  getLoggedUserCart():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }

  removeItemCart(id:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  ClearCart():Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }

  // ^ plus and minus
  updateProductQuantity(id:string, count:number):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
      {
        'count': count
      }
    )
  }



}
