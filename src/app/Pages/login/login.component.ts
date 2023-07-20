import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common/service/common.service';
import { decodeToken } from '../../utils/token';
import { MasterService } from 'src/app/shared-service/master.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   submitted :boolean = false;
   decodedToken!:any;
   loginText = "Login"

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
    if(this.loginForm.valid){
    //  console.log(this.loginForm.value)
      localStorage.clear();
      let loginFormData :any ={};
      loginFormData.email=  this.loginForm.controls['email'].value;
      loginFormData.password = this.loginForm.controls['password'].value;

      this._commonService.login(loginFormData).subscribe((data:any) => {
        console.log(data)
        if(data.status == 200){
          this.decodedToken = decodeToken(data.token);
          localStorage.setItem('userToken',data.token);
          var loggedUserDetails = this.decodedToken.admin
          this._toastrService.success('Logged in successfully!');
          this.masterService.sendUserDetails(loggedUserDetails)
          this._router.navigate(['/admin/listofteachers'])
        }else{
          this._toastrService.info('Logging in. Please hold on!');
        }
      }, (error:HttpErrorResponse)=>{
        this._toastrService.error(error.error.message)
      })
       
    }else{
      console.log('invalid login')
    }
  }

}
