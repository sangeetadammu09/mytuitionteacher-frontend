import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ParentService } from '../../../../app/shared/services/parent.service';
import { CommonService } from '../../../../app/shared/services/common.service';
import { Pagination } from '../../../../app/shared/utils/pagination';

@Component({
  selector: 'app-parent-feedback',
  templateUrl: './parent-feedback.component.html',
  styleUrls: ['./parent-feedback.component.scss']
})
export class ParentFeedbackComponent {

  title = 'Feedback Form';
  breadcrumb = ['Dashboard', 'Parent', 'Feedback Form'];
  tuitionList :any[] = [];
  feedbackList:any[] = [];
  feedbackForm : FormGroup
  submitted = false;
  user = JSON.parse(localStorage.getItem('user'));
  parentData: any;
  tableColumns = ['SNo.','Reg. Date', 'Name', 'Teacher', 'Tuition','Rating','Comment', 'Action']
  pagination = Pagination;
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;

   // convenience getter for easy access to form fields
   get p() { return this.feedbackForm.controls; };


  constructor(private fb : FormBuilder, private parentService : ParentService,
    private commonService: CommonService,private errHandler : ErrorhandlerService, private _toastrService : ToastrService){ 
      this.feedbackForm = this.fb.group({
        id:[''],
        firstname : [''],
        lastname : [''],
        email : [''],
        contact : [''],
        tuition : ['', Validators.required],
        teacher : ['', Validators.required],
        rating : ['', Validators.required],
        comment : ['', Validators.required],   
        isActive : [true]
      
      })
      
  }

  ngOnInit(): void {
    this.getParentDetails();
    this.getAllFeedbacks();
    this.getTuitionsList();
  }


  getParentDetails(){
    this.commonService.userById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){ 
       this.parentData = data.singleuser;
       this.feedbackForm.patchValue({
        firstname: this.parentData.firstname,
        lastname: this.parentData.lastname,
        email: this.parentData.email,
        contact: this.parentData.mobile,
       
         
      })
   
      }      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this._toastrService.error('Token Expired');
      }
      if(error.status == 500){
       this._toastrService.error('Server Error.Failed to fetch user details');
      }
      
   })})

  }

  getTuitionsList(){
    this.parentService.listoftuitionsById(this.user.id,this.pagination).subscribe({next: (data:any)=>{
      if(data.status == 200){
       let tuitions = data.listofparents.map((item:any) => ({...item, modeofteaching : JSON.parse(item.modeofteaching), 
           title : item.grade+' '+item.subjects}))
      this.tuitionList = tuitions;
      //  this.toastrService.success('Tutions list are fetched successfully')
      }
      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this._toastrService.error('Token Expired');
      }
      if(error.status == 400){
        this._toastrService.error('Please enter valid input');
       }
      if(error.status == 500){
       this._toastrService.error('Server Error.Failed to fetch teachers list');
      }
      
   })})
  }

  
  getAllFeedbacks(){
    this.parentService.listoffeedbackbyparentid(this.user.id,this.pagination).subscribe({next: (data:any)=>{
      if(data.status == 200){ 
         this.feedbackList = data.data;
         this.totalItems = data.total;
      }      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this._toastrService.error('Token Expired');
      }
      if(error.status == 500){
       this._toastrService.error('Server Error.Failed to fetch user details');
      }
      if(error.status == 400){
        this._toastrService.error('Please enter valid input');
       }
      
   })})

  }

  openModal(item:any){
    //this.feedbackData = item;
    this.feedbackForm.patchValue({
      id : item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      contact: item.mobile,
      tuition : item.tuition,
      teacher : item.teacherid,
      rating : item.rating,
      comment : item.comment,   
      isActive : item.isActive
       
    })
  }

  submitFeedback(){
    this.parentService.createfeedback(this.feedbackForm.value).subscribe({next: (data:any)=>{
      if(data.status == 200){ 
        this._toastrService.success('Feedback added successfully');
      }      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this._toastrService.error('Token Expired');
      }
      if(error.status == 500){
       this._toastrService.error('Server Error.Failed to fetch user details');
      }
      
   })})

  }

  handlePageChange(event: number){
    console.log(event)
     this.currentPage = event;
     this.pagination.startNumber = event;
     this.getAllFeedbacks();
   
     
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



}
