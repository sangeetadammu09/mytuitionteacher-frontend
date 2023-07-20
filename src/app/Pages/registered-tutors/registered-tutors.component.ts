import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared-service/auth.service';
import { ParentService } from '../../shared-service/parent.service';
import { TeacherService } from '../../shared-service/teacher.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-registered-tutors',
  templateUrl: './registered-tutors.component.html',
  styleUrls: ['./registered-tutors.component.css']
})



export class RegisteredTutorsComponent implements OnInit {

  listofTeachers: any =[];
  applyJobForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  appliedTeacherDetails: any = {};
  noTeacherFoundMsg: any;
  interestedTuition: any = {};
   // Pagination parameters.
   page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  deleteTeacherId: any;
  @ViewChild('closeDeleteTeacherModal')   closeDeleteTeacherModal: any;
 

   // convenience getter for easy access to form fields
   get t() { return this.applyJobForm.controls; };

  constructor(private teacherService : TeacherService,private toastrService : ToastrService) {
   }

  ngOnInit(): void {
    this.getAllRegisteredTeachers();
  }

  getAllRegisteredTeachers(){
    let pagination:any={};
    pagination.startNumber = this.page;
    pagination.pageSize = this.tableSize;
    this.teacherService.listofteachers(pagination).subscribe((data:any) => {
      console.log(data)
     if(data.status == 200){
      data.listofteachers.forEach((item:any)=>{
        var modeofteaching = item.modeofteaching;
        modeofteaching = Object.assign({},modeofteaching);
      })
      
      this.listofTeachers = data.listofteachers;
      this.count = data.total;
     }
      
    })
  }

 
  

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllRegisteredTeachers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllRegisteredTeachers();
  }

  showeditTeacherModal(item:any){

  }


  showdeleteTeacherModal(item:any){
    this.deleteTeacherId = item._id;
  }

  deleteTeacher(){
       this.teacherService.deleteteacher(this.deleteTeacherId).subscribe((t:any)=>{
        if(t.status == 200){
          this.toastrService.success('Teacher deleted successfully');
          this.closeDeleteTeacherModal.nativeElement.click();
          this.getAllRegisteredTeachers()
        }
       })
  }


}
