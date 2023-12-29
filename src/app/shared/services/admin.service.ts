import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient){ }


  getAllSubAdmins(data:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.SubAdmin.listofsubAdmin,data)
  }

  addSubAdmin(data:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.SubAdmin.register,data)
  }

  updateSubAdmin(id:any,data:any){
    return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.SubAdmin.update+`/${id}`,data)
  }

  deleteSubAdmin(id:any){
    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.SubAdmin.delete+`/${id}`)
  }


 


  
}
