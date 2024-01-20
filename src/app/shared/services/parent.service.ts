import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_DI_CONFIG } from '../utils/app.config';


@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private _http: HttpClient) { }

  createparent(parent: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.form,parent)
  }

  listofteachingjobs(pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.listofteachingjobsbypage,pagination)
  }

  listoftuitionsByParentId(id:any,pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.listoftuitionsByParentId+id,pagination)
  }

  singleparent(_id:string){
    return this._http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.parentbyid+_id)
  }

  updateparent(parent: any){
    return this._http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.parentupdate, parent)
  }
  
  deleteparent(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.parentdelete+_id)
  }

  checkPhoneEmail(id:string){
    return this._http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Parent.checkphoneemail+id)
  }

  // feedback
  createfeedback(data: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.create,data)
  }

  listoffeedbacks(pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.listoffeedbacks,pagination)
  }

  listoffeedbackbyparentid(id:any,pagination: any){
    return this._http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.listbyparentid+id,pagination)
  }

  updatefeedback(data: any){
    return this._http.put<any>(APP_DI_CONFIG.dataDomain+APP_DI_CONFIG.endPoints.Feedback.update,data)
  }
  
  deletefeedback(_id:string){
    return this._http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Feedback.delete+_id)
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
