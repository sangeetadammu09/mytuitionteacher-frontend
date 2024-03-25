import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ParentService } from '../../../../app/shared/services/parent.service';
import { Pagination } from '../../../../app/shared/utils/pagination';
import { MasterService } from '../../../../app/shared/services/master.service';
import { AuthService } from '../../../../app/shared/services/auth.service';
import { TeacherService } from '../../../../app/shared/services/teacher.service';


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
  appliedTuitionComment ='';
  appliedTeacherDetails :any = {};
  @ViewChild('closeJobApplyModal') closeJobApplyModal! : ElementRef;


  constructor(private fb: FormBuilder, private parentService: ParentService, private teacherService: TeacherService,
    private router: Router, private errHandler: ErrorhandlerService,private authService : AuthService, 
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
          data.data.forEach((x: any) => {
            let teacherAppliedAlready = JSON.parse(x.teachersApplied);
            let appliedForTuition = teacherAppliedAlready.find((y:any)=> y.teacherid == this.user.id);
            console.log(appliedForTuition)
            appliedForTuition != undefined ? x.appliedForTuition = true : x.appliedForTuition =  false;
            
          })
          
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
    this.tuitionItem.title = 
    `Need ${item.gender} ${item.lookingfor} in ${item.location} to teach ${item.grade} for ${item.days} days/weekly ${item.hours} daily`;
    this.tuitionItem.parentDetails = 
    `Parent: ${item.pname}, ${item.pemail} and contact ${item.contact}`;

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


  applyTuition(){
    if(this.user.id){
      var teacher :any = {}
      teacher.email = this.user.email;
      teacher.appliedTutionid = this.tuitionItem._id;
      teacher.comment = this.appliedTuitionComment;
      this.teacherService.jobApplied(teacher).subscribe({next: (data:any)=>{
        if(data.status == 200){
          this.closeJobApplyModal.nativeElement.click();
          this.toastrService.success("Tuition Applied Successfully")
          this.appliedTeacherDetails.teacherDetails = data.appliedteacher;
          this.appliedTeacherDetails.appliedFor= this.tuitionItem.title;
          this.appliedTeacherDetails.parentDetails= this.tuitionItem.parentDetails;
          console.log(this.appliedTeacherDetails)
        
          this.authService.interestedteacherEmail(this.appliedTeacherDetails).subscribe((data:any) => {
         // console.log(data, 'email')
           });

          //update tuition
         
          let payload :any= {};
          payload.parentid = this.tuitionItem.parentid,
          payload.name= this.tuitionItem.name,
          payload.email = this.tuitionItem.email,
          payload.contact= this.tuitionItem.contact,
          payload.location= this.tuitionItem.location,
          payload.state= this.tuitionItem.state,
          payload.city= this.tuitionItem.city,
          payload.lookingfor= this.tuitionItem.lookingfor,
          payload.modeofteaching = this.tuitionItem.modeofteaching,
          payload.grade= this.tuitionItem.grade,
          payload.board= this.tuitionItem.board,
          payload.subjects= this.tuitionItem.subjects,
          payload.details= this.tuitionItem.details,
          payload.days= this.tuitionItem.days,
          payload.hours= this.tuitionItem.hours,
          payload.time= this.tuitionItem.time,
          payload.gender= this.tuitionItem.gender,
          payload.budget= this.tuitionItem.budget,
          payload.budgettype= this.tuitionItem.budgettype,
          payload.isActive = this.tuitionItem.isActive,
          payload.status = this.tuitionItem.status
          let teacherArr :any[] = [];
          teacherArr.push({ teacherid : this.user.id})
          payload.teachersApplied = teacherArr
        
          let formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if(key !== 'modeofteaching' && key !== 'teachersApplied'){
              formData.append(key, (value).toString());
            }
            
          });
          formData.append('modeofteaching', JSON.stringify(payload.modeofteaching))
          formData.append('teachersApplied', JSON.stringify(payload.teachersApplied))
          
          this.parentService.updateparent(this.tuitionItem._id,formData).subscribe({next: (data: any) => {
            if (data.status == 200) {
            //  $('#parentModal').modal('show')
              this.authService.parentEmail(payload).subscribe((data: any) => {
                console.log(data, 'email')
              });
              this.toastrService.success('Tuition is updated successfully')
              this.getTuitionsList();
            }
  
          }, error: ((err: any) => {
            let error = this.errHandler.handleError(err);
            //console.log(error)
            if (error.status == 401) {
              this.toastrService.error('Token Expired');
            }
            if (error.status == 500) {
              this.toastrService.error('Server Error.Failed to update parent');
            }
  
          })
        })
       
        }      
      },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this.toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this.toastrService.error('Server Error.Failed to fetch user details');
        }
        
      })})
       
    }
  }

}


