import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ParentService } from '../../../shared/services/parent.service';
import { TeacherService } from '../../../shared/services/teacher.service';

@Component({
  selector: 'app-teacher-jobs',
  templateUrl: './teacher-jobs.component.html',
  styleUrls: ['./teacher-jobs.component.css']
})
export class TeacherJobsComponent implements OnInit {

  listofTeachingJobs: any =[];
  applyJobForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  appliedTeacherDetails: any = {};
  noTeacherFoundMsg: any;
  interestedTuition: any = {};
   // Pagination parameters.
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  @ViewChild('closeJobApplyModal') closeJobApplyModal! : ElementRef;

   // convenience getter for easy access to form fields
   get t() { return this.applyJobForm.controls; };

  constructor(private parentService : ParentService, private router : Router,private toastr :ToastrService,
    private teacherService : TeacherService, private fb : FormBuilder, private authService : AuthService) {
    
    this.applyJobForm = this.fb.group({
      name : ['', Validators.required],
      email : ['',[Validators.required, Validators.email]],
      contact : ['', [Validators.required, Validators.pattern('^[0-9,]*$'), Validators.maxLength(10)]],
      
    })
   }

  ngOnInit(): void {
    this.getAllTeachingJobs();
  }

  getAllTeachingJobs(){
    let pagination:any={};
    pagination.startNumber = this.page;
    pagination.pageSize = this.tableSize;
    this.parentService.listofteachingjobs(pagination).subscribe((data:any) => {
    //  console.log(data)
       data.listofparents.forEach((data:any) => {
        data.additionalDetails = data.details != "" ? data.details : "-"
       })
      this.listofTeachingJobs = data.listofparents;
      this.count = data.total;

      
    })
  }

  clickToApply(item:any){
    console.log(item)
    this.interestedTuition = item;
     this.interestedTuition.title = 
    `Need ${item.gender} ${item.lookingfor} in ${item.location} to teach ${item.grade} for ${item.days} days/weekly ${item.hours} daily`;
    this.interestedTuition.parentDetails = 
    `Parent: ${item.pname}, ${item.pemail} and contact ${item.contact}`;

    this.visible = !this.visible;
  }

  submitJob(){
    this.submitted = true;
    //console.log(this.applyJobForm.value)
    if(this.applyJobForm.valid){
      var teacherEmail :any = {}
      teacherEmail.email = this.applyJobForm.controls['email'].value;
      teacherEmail.jobId = this.interestedTuition._id;
       this.teacherService.jobApplied(teacherEmail).subscribe((data:any) => {
            console.log(data)
           if(data.status == 200){
            this.closeJobApplyModal.nativeElement.click();
            this.toastr.success("Job Applied Successfully")
            this.appliedTeacherDetails.teacherDetails = data.appliedteacher;
            this.appliedTeacherDetails.appliedFor= this.interestedTuition.title;
            this.appliedTeacherDetails.parentDetails= this.interestedTuition.parentDetails;
            console.log(this.appliedTeacherDetails) 
            this.authService.interestedteacherEmail(this.appliedTeacherDetails).subscribe((data:any) => {
           // console.log(data, 'email')
             });
           

         }
         if(data.status == 204){
          this.noTeacherFoundMsg = data.message;
          console.log(this.noTeacherFoundMsg)
       }

      },(error:any)=>{
           console.log(error)
           
      })
    }
  }


  moveToTeacherForm(){
    this.router.navigate(['/teacher-form'])
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllTeachingJobs();
  }
 

}
