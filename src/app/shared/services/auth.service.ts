import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_DI_CONFIG } from '../utils/app.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private messageSource = new BehaviorSubject(0);
  

  currentMessage = this.messageSource.asObservable();


  changeMessage(provider:any){
   // console.log(provider);
    this.messageSource.next(provider);
  }


  contactEmail(body:any) {
    return this.http.post(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Mail.contact, body);
    
  }
  parentEmail(body:any) {
    return this.http.post(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Mail.parent, body);
    
  }
  teacherEmail(body:any) {
     return this.http.post(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Mail.teacher, body);
  }

  interestedteacherEmail(body:any) {
    return this.http.post(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Mail.appliedteacher, body);
 }

}
