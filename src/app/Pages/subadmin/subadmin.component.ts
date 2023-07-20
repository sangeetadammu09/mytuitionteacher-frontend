import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-subadmin',
  templateUrl: './subadmin.component.html',
  styleUrls: ['./subadmin.component.css']
})
export class SubadminComponent implements OnInit {

  listofSubAdmin: any =[];
  submitted: boolean = false;
   // Pagination parameters.
   page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  deleteSubAdminId: string;
  @ViewChild('closeDeleteSubAdminModal') closeDeleteSubAdminModal: any;
  @ViewChild('closeAddSubAdminModal') closeAddSubAdminModal:any;
  @ViewChild('closeUpdateSubAdminModal') closeUpdateSubAdminModal:any;
  addSubAdminB:boolean= false;
  editSubAdminB:boolean= false;
  subAdminModel :any ={};
  statusList : any[] = [{'id' : 0, 'name' : 'Active', 'value': true},{'id' : 1, 'name' : 'InActive', 'value': false}]


   // convenience getter for easy access to form fields
  // get t() { return this.applyJobForm.controls; };

  constructor(private adminService : AdminService, private toastrService : ToastrService){
   }

  ngOnInit(): void {
    this.getAllSubAdmin();
    this.subAdminModel.isActive = true;
  }

  getAllSubAdmin(){
    let pagination:any={};
    pagination.startNumber = this.page;
    pagination.pageSize = this.tableSize;
    this.adminService.getAllSubAdmins(pagination).subscribe((data:any) => {
      console.log(data.listofsubadmins)
     if(data.status == 200){
      this.listofSubAdmin = data.listofsubadmins;
      this.count = data.total;
     }
      
    })
  }

 
  

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllSubAdmin();
  }


  showAddSubAdminModal(){
         this.addSubAdminB = true;
         this.editSubAdminB = false;
  }

  addSubAdmin(f:any){
    this.adminService.addSubAdmin(f.value).subscribe(data =>{
      console.log(data);
      if(data.status == 200){
        this.toastrService.success('SubAdmin added successfully');
        this.closeAddSubAdminModal.nativeElement.click();
        this.getAllSubAdmin();
      }
    })
  }

  showeditSubAdminModal(item:any){
        this.addSubAdminB = false;
        this.editSubAdminB = true;
        this.subAdminModel = item;
  }

  updateSubAdmin(g:any){
    console.log(g.value, this.subAdminModel)
    this.adminService.updateSubAdmin(this.subAdminModel._id,this.subAdminModel).subscribe(data =>{
      console.log(data);
      if(data.status == 200){
        this.toastrService.success('SubAdmin updated successfully');
        this.closeUpdateSubAdminModal.nativeElement.click();
        this.getAllSubAdmin();
      }
    })
  }

  showdeleteSubAdminModal(item:any){
    this.deleteSubAdminId = item._id;
  }

  deleteSubAdmin(){
       this.adminService.deleteSubAdmin(this.deleteSubAdminId).subscribe((t:any)=>{
        if(t.status == 200){
          this.toastrService.success('SubAdmin deleted successfully');
          this.closeDeleteSubAdminModal.nativeElement.click();
          this.getAllSubAdmin();
        }
       })
  }

}
