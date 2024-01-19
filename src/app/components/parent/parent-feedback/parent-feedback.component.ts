import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ParentService } from '../../../../app/shared/services/parent.service';
import { CommonService } from '../../../../app/shared/services/common.service';

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
  addFeedbackForm : FormGroup
  submitted = false;
  user = JSON.parse(localStorage.getItem('user'));
  parentData: any;
  tableColumns = ['SNo.','Reg. Date', 'Name', 'Teacher', 'Tuition','Rating','Comment', 'Action']

   // convenience getter for easy access to form fields
   get p() { return this.addFeedbackForm.controls; };


  constructor(private fb : FormBuilder, private parentService : ParentService,
    private commonService: CommonService,private errHandler : ErrorhandlerService, private _toastrService : ToastrService){ 
      this.addFeedbackForm = this.fb.group({
        firstname : [''],
        lastname : [''],
        email : [''],
        contact : [''],
        tuition : ['', Validators.required],
        teacher : ['', Validators.required],
        rating : ['', Validators.required],
        comment : ['', Validators.required],   
      
      })
  }

  ngOnInit(): void {
    this.getParentDetails();
  }


  getParentDetails(){
    // console.log(this.user, 'user');
    this.commonService.userById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){ 
       this.parentData = data.singleuser;
      // console.log(this.parentData, '--', JSON.parse(this.parentData.sociallinks));
       this.addFeedbackForm.patchValue({
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



  submitFeedback(){

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

}
