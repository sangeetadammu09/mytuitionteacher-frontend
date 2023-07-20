import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  private userSource = new BehaviorSubject(null);
  currentuserDetails = this.userSource.asObservable();

  sendUserDetails(user: any) {
    this.userSource.next(user);
  }

  isLoggedIn(){
    return localStorage.getItem('userToken') != null;
  }
}
