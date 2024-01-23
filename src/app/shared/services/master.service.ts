import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  menuData:any;
  payloadData : any;
  
  private userSource = new BehaviorSubject(null);
  currentuserDetails = this.userSource.asObservable();

  sendUserDetails(user: any) {
    this.userSource.next(user);
  }

  isLoggedIn(){
    return localStorage.getItem('userToken') != null;
  }

  sendMenu(menu:any){
    this.menuData = menu;
  }

  getMenu(){
    return this.menuData;
  }

  sendData(data:any){
    this.payloadData = data;
  }

  getData(){
    return this.payloadData;
  }

}
