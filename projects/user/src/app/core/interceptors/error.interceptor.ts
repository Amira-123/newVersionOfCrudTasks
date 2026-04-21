import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private inject:Injector,
    private route:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        let toaster= this.inject.get(ToastrService)
        toaster.error(error.error.message);
        if(error.error.message=='jwt expired' ||
          error.error.message== "Jwt must provides")  {
          this.route.navigate(['/auth/'])
        }
        throw error
    }))
  }
}
