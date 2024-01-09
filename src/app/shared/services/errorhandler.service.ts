import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  constructor(private http : HttpClient) { }

  handleError(error: HttpErrorResponse){
    console.log(error)
    return {'status': error.status,'message' : error.error.err};
  }
}
