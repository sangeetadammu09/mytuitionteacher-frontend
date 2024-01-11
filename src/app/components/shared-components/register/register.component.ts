import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoleList } from '../../../../assets/referencedata/role'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../app/shared/services/common.service';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rolesList = RoleList.data;
  registerForm :FormGroup;
  get f() { return this.registerForm.controls};
  submitted = false;
  registerText = 'Register';
  passwordMatchText:string = '';
  togglePasswordIcon: boolean = false;
  @ViewChild('inputpassword') inputpassword!:ElementRef;

  constructor( private _router: Router, private _fb: FormBuilder, private _commonService: CommonService, 
               private errHandler : ErrorhandlerService,private _toastrService : ToastrService) { 
     this.registerForm = this._fb.group({
        firstname : ['', Validators.required],
        lastname : ['', Validators.required],
        email : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        mobile : ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        role : ['', Validators.required],
        location: ['empty', Validators.required],
        sociallinks:  ['empty', Validators.required],
        password : ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        cpass : ['', Validators.required],    
        isActive : [true],
        //imageurl: [],
     })

  }

  ngOnInit(): void {}

  moveToLoginPage(){
    this._router.navigate(['/login'])
  }

  
  togglePassword(){
    this.togglePasswordIcon = !this.togglePasswordIcon;
    if(this.togglePasswordIcon){ 
      this.inputpassword.nativeElement.setAttribute("type", 'text');
    }else{
      this.inputpassword.nativeElement.setAttribute("type", 'password');
    }
  
  }

  register(){
    this.submitted = true;
      if(this.registerForm.valid){
        let payload = this.registerForm.value;
        let formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, (value).toString());
        });
    //  formData.append('image', this.selectedFile, this.selectedFileName);
        this._commonService.register(formData).subscribe({next: (data:any)=>{
          if(data.status == 200){
            this._toastrService.success('Registered successfully!');
            this._router.navigate(['/login'])
          }      
        },error:((err:any) =>{
          let error =  this.errHandler.handleError(err);
          //console.log(error)
          if(error.status == 401) {
           this._toastrService.error('Token Expired');
          }
          if(error.status == 500){
           this._toastrService.error('Server Error.Failed to register');
          }
          
       })})
         
      }else{
        console.log('invalid login')
      }
  }



}
