import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterService } from '../../../../app/shared/services/master.service';
import { CommonService } from '../../../../app/shared/services/common.service';
import { decodeToken } from '../../../../app/shared/utils/token';
import { AdminMenuList } from '../../../../assets/menus/menu';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   submitted :boolean = false;
   decodedToken!:any;
   loginText = "Login";
   menuList = AdminMenuList;

  constructor( private _router: Router, private _fb: FormBuilder,private _toastrService: ToastrService, 
    private _commonService: CommonService, private masterService: MasterService) { 
     this.loginForm = this._fb.group({
        email : ['', Validators.required],
        password : ['', Validators.required]
     })
  }


  ngOnInit(): void {
    
  }

  get f() {return this.loginForm.controls;}

  moveToRegisterPage(){
    this._router.navigate(['/register'])
  }

  login(){
    this.submitted = true;
    this._router.navigate(['/dashboard/parent-details']);
    this.masterService.sendMenu(this.menuList);
   
    // if(this.loginForm.valid){
    //   localStorage.clear();
    //   let loginFormData :any ={};
    //   loginFormData.email=  this.loginForm.controls['email'].value;
    //   loginFormData.password = this.loginForm.controls['password'].value;

    //   this._commonService.login(loginFormData).subscribe((data:any) => {
    //     console.log(data)
    //     if(data.status == 200){
    //       this.decodedToken = decodeToken(data.token);
    //       localStorage.setItem('userToken',data.token);
    //       var loggedUserDetails = this.decodedToken.admin
    //       this._toastrService.success('Logged in successfully!');
    //       this.masterService.sendUserDetails(loggedUserDetails)
    //       this._router.navigate(['/admin/listofteachers'])
    //     }else{
    //       this._toastrService.info('Logging in. Please hold on!');
    //     }
    //   }, (error:HttpErrorResponse)=>{
    //     this._toastrService.error(error.error.message)
    //   })
       
    // }else{
    //   console.log('invalid login')
    // }
  }

}
