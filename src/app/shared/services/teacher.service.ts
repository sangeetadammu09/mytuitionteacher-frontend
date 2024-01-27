import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from '../utils/app.config';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  constructor(private _http: HttpClient) { }

 
  createteacher(teacher: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.form,teacher)
  }


  listofteachers(pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.listofteachers,pagination)
  }

  singleteacher(id:string){
    return this._http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.teacherbyid+`/${id}`)
  }

  updateteacher(id:any,teacher: any){
    return this._http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.teacherupdate`/${id}`, teacher)
  }
  
  deleteteacher(id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.teacherdelete+`/${id}`)
  }
  
  checkPhoneEmail(val:string){
    return this._http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.checkphoneemail+val)
  }


  jobApplied(job:any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Teacher.jobapply,job)
  }


   //Helper Methods

   setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
