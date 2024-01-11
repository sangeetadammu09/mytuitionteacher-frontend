import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    var token = localStorage.getItem('userToken');
    
    console.log('setting token from interceptor', token) 
    
   if (token) {
     // If we have a token, we set it to the header 
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
     });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 // redirect user to the logout page
        
     	}
 	 }
  	return throwError(err);
	})
   )
  }

  

}
