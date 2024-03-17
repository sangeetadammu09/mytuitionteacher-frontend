import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { AdminService } from '../../../../app/shared/services/admin.service';
import { CommonService } from '../../../../app/shared/services/common.service';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {
  title = 'Sub Admin List';
  breadcrumb :any;
  startNumber = 1;
  pageSize = 10;
  payload :any = {};
  subAdminList :any[] = [];
  filterText= '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;
  tableColumns = ['SNo.','Reg. Date','Name', 'Location', 'Qualification', 'Mode','Exp.','Subjects','Charge', 'Vehicle', 'Action'];
  rolesList = [];
  registerForm :FormGroup;
  get f() { return this.registerForm.controls};
  submitted = false;
  registerText = 'Register';
  passwordMatchText:string = '';
  togglePasswordIcon: boolean = false;
  @ViewChild('inputpassword') inputpassword!:ElementRef;


  constructor(private fb : FormBuilder, private adminService : AdminService,
              private router : Router, private errHandler : ErrorhandlerService,
              private toastrService : ToastrService,private _fb: FormBuilder, private _commonService: CommonService){ 
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


  ngOnInit(): void {
    this.getTeachersList();
    this.getRouteDetails();
  }

  getRouteDetails(){
    this.breadcrumb = this.router.url.replace('/','');
    this.breadcrumb = this.breadcrumb.split('/');
  }

  getTeachersList(){
    this.payload.startNumber = 1;
    this.payload.pageSize = 10;
    this.adminService.getAllSubAdmins(this.payload).subscribe({next: (data:any)=>{
      if(data.status == 200){
        console.log(data)
       //console.log(listofteachers)
      //  this.subAdminList = listofteachers;
      }
      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this.toastrService.error('Token Expired');
      }
      if(error.status == 500){
       this.toastrService.error('Server Error.Failed to fetch teachers list');
      }
      
   })})
  }

  handlePageChange(event: number){
    // console.log(event)
    //  this.currentPage = event;
    //  this.filterPayload.pageNumber = event;
    //  this.getTeachersList();
   
     
  }
 
  onTableSizeChange(event: any): void {
  //  this.itemsPerPage = event.target.value;
  //  this.filterPayload.pageSize = event.target.value;
  //    this.userService.getManagers(this.filterPayload).subscribe((data:any) => {
  //      if(data.APIResponse.data.length > 0){
  //        let users= data.APIResponse.data;
  //        this.managerList = users;
  //        this.totalItems = data.TotalCount;
  //       }else{
  //         this.managerList = [];
  //       }   
  //  },(err:HttpErrorResponse) => {
  //      console.log(err)
  //  })
 }
 
  searchTeacher(text:any){

  }

   
  togglePassword(){
    this.togglePasswordIcon = !this.togglePasswordIcon;
    if(this.togglePasswordIcon){ 
      this.inputpassword.nativeElement.setAttribute("type", 'text');
    }else{
      this.inputpassword.nativeElement.setAttribute("type", 'password');
    }
  
  }

  addSubAdmin(){
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
            this.toastrService.success('Registered successfully!');
          }      
        },error:((err:any) =>{
          let error =  this.errHandler.handleError(err);
          //console.log(error)
          if(error.status == 401) {
           this.toastrService.error('Token Expired');
          }
          if(error.status == 500){
           this.toastrService.error('Server Error.Failed to register');
          }
          
       })})
         
      }else{
        console.log('invalid login')
      }
  }


  
}
