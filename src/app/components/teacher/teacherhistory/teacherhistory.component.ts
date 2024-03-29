import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ParentService } from '../../../../app/shared/services/parent.service';
import { Pagination } from '../../../../app/shared/utils/pagination';
import { MasterService } from '../../../../app/shared/services/master.service';

@Component({
  selector: 'app-teacherhistory',
  templateUrl: './teacherhistory.component.html',
  styleUrls: ['./teacherhistory.component.scss']
})
export class TeacherhistoryComponent {

  title = 'Tuition History';
  breadcrumb = ['Dashboard', 'Teacher', 'Tuition History'];
  startNumber = 1;
  pageSize = 10;
  pagination = Pagination;
  tuitionList :any[] = [];
  filterText= '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;
  user = JSON.parse(localStorage.getItem('user'));
  tableColumns = ['SNo.','Reg. Date','Status', 'Location', 'Looking for', 'Mode','Details','Grade','Board', 'Subjects', 'Duration',
                  'Budget', 'Gender', 'Action'];


  constructor(private fb : FormBuilder, private parentService : ParentService,
              private router : Router, private errHandler : ErrorhandlerService,
              private toastrService : ToastrService, private masterService : MasterService,){ }


  ngOnInit(): void {
    this.getTuitionsList();

  }

  getTuitionsList(){
    let payload : any = {};
    payload.pagination = this.pagination;
    payload.filterCondition = {'teacherid' : this.user.id};
    this.parentService.searchtuitions(payload).subscribe({next: (data:any)=>{
      if(data.status == 200){
       let tuitions = data.data.map((item:any) => ({...item, modeofteaching : JSON.parse(item.modeofteaching)}))
        this.tuitionList = tuitions;
        console.log(this.tuitionList)
      //  this.toastrService.success('Tutions list are fetched successfully')
      }
      
    },error:((err:any) =>{
      let error =  this.errHandler.handleError(err);
      //console.log(error)
      if(error.status == 401) {
       this.toastrService.error('Token Expired');
      }
      if(error.status == 400){
        this.toastrService.error('Please enter valid input');
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
 


 searchTuition(text:any){

  }

  moveToTeacherForm(item){
    this.router.navigate(['/dashboard/parent/parent-form'])
    if(item){
      this.masterService.sendData(item)
    }
  }

  openTeacherModal(item){

  }

}


