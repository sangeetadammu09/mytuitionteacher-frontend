import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParentService } from '../../../shared/services/parent.service';

@Component({
  selector: 'app-tuitions-list',
  templateUrl: './tuitions-list.component.html',
  styleUrls: ['./tuitions-list.component.css']
})
export class TuitionsListComponent implements OnInit {

  listofTuitions: any =[];
  applyJobForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  appliedTuitionDetails: any = {};
  noTuitionFoundMsg: any;
  interestedTuition: any = {};
   // Pagination parameters.
   page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  deleteTuitionId: string;
  @ViewChild('closeDeleteTuitionModal')   closeDeleteTuitionModal: any;
 

   // convenience getter for easy access to form fields
   get t() { return this.applyJobForm.controls; };

  constructor(private parentService : ParentService, private toastrService : ToastrService){}

  ngOnInit(): void {
    this.getAllTuitions();
  }

  getAllTuitions(){
    let pagination:any={};
    pagination.startNumber = this.page;
    pagination.pageSize = this.tableSize;
    this.parentService.listofteachingjobs(pagination).subscribe((data:any) => {
      console.log(data.listofparents)
     if(data.status == 200){
      // data.listofparents.forEach((item:any)=>{
      //   var modeofteaching = item.modeofteaching;
      //   modeofteaching = Object.assign({},modeofteaching);
      // })
      
      this.listofTuitions = data.listofparents;
      this.count = data.total;
     }
      
    })
  }

 
  

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllTuitions();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllTuitions();
  }

  showdeleteTuitionModal(item:any){
    this.deleteTuitionId = item._id;
  }

  deleteTuition(){
       this.parentService.deleteparent(this.deleteTuitionId).subscribe((t:any)=>{
        if(t.status == 200){
          this.toastrService.success('Tuition deleted successfully');
          this.closeDeleteTuitionModal.nativeElement.click();
          this.getAllTuitions();
        }
       })
  }

  
}
