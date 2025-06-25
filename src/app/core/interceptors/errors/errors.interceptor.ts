import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  toast = inject(ToastrService)

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    
    return next.handle(request).pipe( catchError( (err)=> {
      return throwError( ()=> {        // ! create error return error observable
        this.toast.error(err.error.message, 'FreshCart');
      })
    }) );
  }




}
