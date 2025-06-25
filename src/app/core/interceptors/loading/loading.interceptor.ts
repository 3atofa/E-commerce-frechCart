import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  ngxSpinner = inject(NgxSpinnerService)

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.ngxSpinner.show('loading-2');
    
    return next.handle(request).pipe(finalize(()=>{
      this.ngxSpinner.hide('loading-2')
    }));
  }
}
