import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ParentService } from '../../../../app/shared/services/parent.service';
import { Pagination } from '../../../../app/shared/utils/pagination';
import { MasterService } from '../../../../app/shared/services/master.service';

@Component({
  selector: 'app-tuition-list',
  templateUrl: './tuition-list.component.html',
  styleUrls: ['./tuition-list.component.scss']
})
export class TuitionListComponent {
  title = 'List of Tuitions';
  breadcrumb: any;
  startNumber = 1;
  pageSize = 10;
  pagination = Pagination;
  tuitionList: any[] = [];
  filterText = '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10, 20, 30];
  sortProperty: string = 'id';
  sortOrder = 1;
  user = JSON.parse(localStorage.getItem('user'));
  tableColumns = [];
  modalValue = '';
  tuitionItem : any;


  constructor(private fb: FormBuilder, private parentService: ParentService,
    private router: Router, private errHandler: ErrorhandlerService,
    private toastrService: ToastrService, private masterService: MasterService,) {
    if (this.user.role == 'superadmin' || this.user.role == 'subadmin') {
      this.tableColumns = ['SNo.', 'Reg. Date', 'Status', 'Email', 'Contact', 'Location', 'Looking for', 'Mode', 'Details', 'Grade', 'Board', 'Subjects', 'Duration',
        'Budget', 'Gender', 'Document', 'Action']
     }else{
      this.tableColumns = ['SNo.', 'Reg. Date', 'Status', 'Location', 'Looking for', 'Mode', 'Details', 'Grade', 'Board', 'Subjects', 'Duration',
        'Budget', 'Gender', 'Action']
    }
  }


  ngOnInit(): void {
    this.getTuitionsList();
    this.getRouteDetails();
  }

  getRouteDetails() {
    this.breadcrumb = this.router.url.replace('/', '');
    this.breadcrumb = this.breadcrumb.split('/');
  }

  getTuitionsList() {
    this.parentService.listoftuitions(this.pagination).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          let tuitions = data.data.map((item: any) => ({ ...item, modeofteaching: JSON.parse(item.modeofteaching) }))
          this.tuitionList = tuitions;
          console.log(this.tuitionList)
          //  this.toastrService.success('Tutions list are fetched successfully')
        }

      }, error: ((err: any) => {
        let error = this.errHandler.handleError(err);
        //console.log(error)
        if (error.status == 401) {
          this.toastrService.error('Token Expired');
        }
        if (error.status == 400) {
          this.toastrService.error('Please enter valid input');
        }
        if (error.status == 500) {
          this.toastrService.error('Server Error.Failed to fetch teachers list');
        }

      })
    })
  }

  handlePageChange(event: number) {
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

  searchTuition(text: any) {

  }

  moveToTeacherForm(item) {
    this.router.navigate(['/dashboard/parent/parent-form'])
    if (item) {
      this.masterService.sendData(item)
    }
  }

  openTeacherModal(item) {

  }


  clickToApply(item: any,val:any){
    this.modalValue = val;
    this.tuitionItem = item;

  }

  clickToDelete(item:any, val:any){
    this.modalValue = val;
    this.tuitionItem = item;

  }

  deleteTuition(){
    this.parentService.deleteparent(this.tuitionItem._id).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.toastrService.success('Tutions deleted successfully');
          this.getTuitionsList();
        }

      }, error: ((err: any) => {
        let error = this.errHandler.handleError(err);
        //console.log(error)
        if (error.status == 401) {
          this.toastrService.error('Token Expired');
        }
        if (error.status == 400) {
          this.toastrService.error('Please enter valid input');
        }
        if (error.status == 500) {
          this.toastrService.error('Server Error.Failed to fetch teachers list');
        }

      })
    })
    
  }

  // submitJob(){
  //   this.submitted = true;
  //   //console.log(this.applyJobForm.value)
  //   if(this.applyJobForm.valid){
  //     var teacherEmail :any = {}
  //     teacherEmail.email = this.applyJobForm.controls['email'].value;
  //     teacherEmail.jobId = this.interestedTuition._id;
  //      this.teacherService.jobApplied(teacherEmail).subscribe((data:any) => {
  //           console.log(data)
  //          if(data.status == 200){
  //           this.closeJobApplyModal.nativeElement.click();
  //           this.toastr.success("Job Applied Successfully")
  //           this.appliedTeacherDetails.teacherDetails = data.appliedteacher;
  //           this.appliedTeacherDetails.appliedFor= this.interestedTuition.title;
  //           this.appliedTeacherDetails.parentDetails= this.interestedTuition.parentDetails;
  //           console.log(this.appliedTeacherDetails) 
  //           this.authService.interestedteacherEmail(this.appliedTeacherDetails).subscribe((data:any) => {
  //          // console.log(data, 'email')
  //            });
           

  //        }
  //        if(data.status == 204){
  //         this.noTeacherFoundMsg = data.message;
  //         console.log(this.noTeacherFoundMsg)
  //      }

  //     },(error:any)=>{
  //          console.log(error)
           
  //     })
  //   }
  // }

}


