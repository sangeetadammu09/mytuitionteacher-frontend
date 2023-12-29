import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:  HttpClient) { }

  getUser() {
    return this.http.get<any>('assets/dummy/user.ts');
  }

  getrate()
  {
    return this.http.get<any>('assets/dummy/rate.ts')
  }


}
