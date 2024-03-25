import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ParentService } from '../../../shared/services/parent.service';
import { TeacherService } from '../../../shared/services/teacher.service';
import { Pagination } from '../../../../app/shared/utils/pagination';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent {
  listofTeachingJobs: any =[];
  submitted: boolean = false;
  public visible = false;
  appliedTeacherDetails: any = {};
  noTeacherFoundMsg: any;
  interestedTuition: any = {};
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  pagination = Pagination;
  @ViewChild('closeJobApplyModal') closeJobApplyModal! : ElementRef;

  constructor(private parentService : ParentService, private router : Router,private toastr :ToastrService,
    private teacherService : TeacherService, private fb : FormBuilder, private authService : AuthService) {
    
   }

  ngOnInit(): void {
    this.getAllTeachingJobs();
  }

  getAllTeachingJobs(){
    this.parentService.listoftuitions(this.pagination).subscribe((data:any) => {
     console.log(data)
       data.data.forEach((x:any) => {
        x.additionalDetails = x.details != "" ? x.details : "-"
       })
      this.listofTeachingJobs = data.data;
      this.count = data.total;

      
    })
  }

  clickToApply(item:any){
    console.log(item)
    this.visible = !this.visible;
  }

  moveToRegisterForm(){
    this.router.navigate(['/register'])
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllTeachingJobs();
  }
 

}

