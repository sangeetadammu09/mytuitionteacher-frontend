import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../../app/shared/services/master.service';
import { CommonService } from '../../../../app/shared/services/common.service';
import { AdminMenuList, ParentMenuList, SubAdminMenuList, TeacherMenuList } from '../../../../assets/menus/menu';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { AdminService } from '../../../../app/shared/services/admin.service';


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
   menuList :any;
   togglePasswordIcon: boolean = false;
   @ViewChild('inputpassword') inputpassword!:ElementRef;

  constructor( private _router: Router, private _fb: FormBuilder, private adminService: AdminService,
    private _commonService: CommonService, private masterService: MasterService,
    private errHandler : ErrorhandlerService,
    private _toastrService : ToastrService) { 
     this.loginForm = this._fb.group({
        email : ['', Validators.required],
        password : ['', Validators.required]
     })
  }


  ngOnInit(): void {}

  get f() {return this.loginForm.controls;}

  moveToRegisterPage(){
    this._router.navigate(['/register'])
  }

  togglePassword(){
    this.togglePasswordIcon = !this.togglePasswordIcon;
    if(this.togglePasswordIcon){ 
      this.inputpassword.nativeElement.setAttribute("type", 'text');
    }else{
      this.inputpassword.nativeElement.setAttribute("type", 'password');
    }
  
  }

  login(){
    this.submitted = true;
    if(this.loginForm.valid){
      localStorage.clear();
      this._commonService.login(this.loginForm.value).subscribe({next: (data:any)=>{
        if(data.status == 200){
        //  this.decodedToken = decodeToken(data.token);

          localStorage.setItem('userToken',data.token);
          let loggedUserDetails = data.loggedcommon;
          this._toastrService.success('Logged in successfully!');
        //  this.masterService.sendUserDetails(loggedUserDetails);
          localStorage.setItem('user', JSON.stringify(loggedUserDetails))
          // navigation to specific users
          //this.masterService.sendMenu(this.menuList); 
          if(loggedUserDetails.role == 'parent'){
            this._router.navigate(['/dashboard/parent/my-profile']) ;
            localStorage.setItem('menu', JSON.stringify(this.menuList = ParentMenuList.data));
          }else if(loggedUserDetails.role == 'teacher'){
            this._router.navigate(['/dashboard/teacher/my-profile']);
            localStorage.setItem('menu', JSON.stringify(this.menuList = TeacherMenuList.data));
          }
          console.log(this.menuList,'menu list loaded')
        }  
      },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this._toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this._toastrService.error('Server Error.Failed to login');
        }
        if(error.status == 400){
          this._toastrService.error('Invalid details. Please try again');
         }
        if(error.status == 403){
          this.adminService.login(this.loginForm.value).subscribe({next: (data:any)=>{
            if(data.status == 200){
            //  this.decodedToken = decodeToken(data.token);
    
              localStorage.setItem('userToken',data.token);
              let loggedUserDetails = data.loggedcommon;
              this._toastrService.success('Logged in successfully!');
            //  this.masterService.sendUserDetails(loggedUserDetails);
              localStorage.setItem('user', JSON.stringify(loggedUserDetails))
              // navigation to specific users
              //this.masterService.sendMenu(this.menuList); 
              if(loggedUserDetails.role == 'superadmin'){
                this._router.navigate(['/dashboard/superadmin/my-profile']);
                localStorage.setItem('menu', JSON.stringify(this.menuList = AdminMenuList.data));
              }else if(loggedUserDetails.role == 'subadmin'){
                this._router.navigate(['/dashboard/subadmin/my-profile'])
                localStorage.setItem('menu', JSON.stringify(this.menuList = SubAdminMenuList.data));
              }
              console.log(this.menuList,'menu list loaded')
            }  
          },error:((err:any) =>{
            let error =  this.errHandler.handleError(err);
            //console.log(error)
            if(error.status == 401) {
             this._toastrService.error('Token Expired');
            }
            if(error.status == 500){
             this._toastrService.error('Server Error.Failed to login');
            }
            if(error.status == 400){
              this._toastrService.error('Invalid details. Please try again');
             }
            if(error.status == 403){
              this._toastrService.error('No User found. Please try again');
            
            }        
            
         })})
        
        }
        
        
     })})
       
    }else{
      console.log('invalid login')
    }
  }

}
