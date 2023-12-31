import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient){ }

  login(data:any){
   return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.SuperAdmin.login,data)
  }


}
