import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { TeacherService } from '../../../../app/shared/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent {

  title = 'Teacher List';
  breadcrumb = ['Dashboard', 'Parent', 'Teacher List'];
  startNumber = 1;
  pageSize = 10;
  payload :any = {};
  teacherList :any[] = [];
  filterText= '';
  currentPage: number = 1;
  page: number = 1
  itemsPerPage: number = 10;
  totalItems: number = 0;
  tableSize: number[] = [10,20,30];
  sortProperty: string = 'id';
  sortOrder = 1;


  constructor(private fb : FormBuilder, private teacherService : TeacherService,
              private router : Router, private errHandler : ErrorhandlerService,
              private toastrService : ToastrService){ }


  ngOnInit(): void {
    this.getTeachersList();

  }

  getTeachersList(){
    this.payload.startNumber = 1;
    this.payload.pageSize = 10;
    this.teacherService.listofteachers(this.payload).subscribe({next: (data:any)=>{
      if(data.status == 200){
       let listofteachers = data.listofteachers.map((item:any) => ({...item, modeofteaching : JSON.parse(item.modeofteaching)}))
       //console.log(listofteachers)
        this.teacherList = listofteachers;
       // this.toastrService.success('Teacher list are fetched successfully')
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

}
