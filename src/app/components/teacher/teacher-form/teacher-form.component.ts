import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../../shared/services/teacher.service';
import { States } from '../../../../assets/referencedata/states';
import { ModeofTeachingArr } from '../../../../assets/referencedata/modeofteaching';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MasterService } from '../../../../app/shared/services/master.service';
import { CommonService } from '../../../../app/shared/services/common.service';

declare var $: any;

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {

  teacherForm!: FormGroup;
  submitted: boolean = false;
  modeofTeachingArr = ModeofTeachingArr.data;
  modeValueArr: any =[];
  public visible = false;
  statesList = States.data;
  selectedFile:any;
  selectedFileName:string = "";
  title = 'Tuition Form';
  breadcrumb = ['Dashboard', 'Parent', 'Tuition Form'];
  user = JSON.parse(localStorage.getItem('user'));
  parentSubmitBtnText = 'Submit';
  imageUrl = '';
  teacherData:any;
  tuitionData :any;

   // convenience getter for easy access to form fields
   get t() { return this.teacherForm.controls; };


  constructor(private fb : FormBuilder, private teacherService : TeacherService,  private router : Router,
    private _toastrService : ToastrService, private errHandler : ErrorhandlerService,private commonService: CommonService,
    private authService : AuthService,private masterService: MasterService){

      this.teacherForm = this.fb.group({
        name : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
        contact : ['', [Validators.required, Validators.pattern('^[0-9,]*$'), Validators.maxLength(10)]],
        state : ['', Validators.required],
        city : ['', Validators.required],
        location : ['', Validators.required],
        qualification : ['', Validators.required],
        teachingexp : ['', Validators.required],
        about : [''],
        modeofteaching : [, Validators.required],
        subjects : ['', Validators.required],
        timing : ['', Validators.required],
        vehicle : ['', Validators.required],
        preferredlocation : ['', Validators.required],
        charge : ['', [Validators.required, Validators.pattern('^[0-9,]*$')]],
        chargeType : ['', Validators.required],
        imageurl: [, Validators.required],
        isActive : [true]
      
      })
  }

 
  ngOnInit(): void {
    this.getParentDetails();
  }


  getParentDetails(){
    this.tuitionData = this.masterService.getData();
   // console.log(this.tuitionData,'data')
    this.commonService.userById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // this._toastrService.success('Profile successfully!');
       this.teacherData = data.singleuser;   
       if(this.tuitionData == undefined && this.teacherData){
       this.teacherForm.patchValue({
      //  parentid: this.teacherData._id,
        name: this.teacherData.firstname +' '+ this.teacherData.lastname,
        email : this.teacherData.email,
        contact: this.teacherData.mobile,
        state : "Andhra Pradesh",
        city : "Vizag",
        location : "Old Dairy Farm", 
        qualification : "BTech",
        teachingexp : "0-2 years",
        about : "I am looking for home tuition jobs",
        subjects : "maths,science",
        details : 'looking for teacher',
        modeofteaching : "home",
        timing: "5pm",
        gender : "female",
        vehicle : "yes",
        preferredlocation : "mvp colony",
        charge : "5000",
        chargeType : "per month",
        imageurl: ""
  
       })
      }else{
       
        this.parentSubmitBtnText = "Update";
        this.teacherForm.patchValue({
          name: this.tuitionData.name,
          email : this.teacherData.email,
          contact: this.teacherData.mobile,
          state : this.teacherData.state,
          city : this.teacherData.city,
          location : this.teacherData.location, 
          qualification : this.teacherData.qualification,
          teachingexp : this.teacherData.teachingexp,
          about : this.teacherData.about,
          subjects : this.teacherData.subjects,
          details : this.teacherData.details,
        //  modeofteaching : "home",
          timing: this.tuitionData.timing,
          gender : this.teacherData.gender,
          vehicle : this.teacherData.vehicle,
          preferredlocation : this.teacherData.preferredlocation,
          charge : this.tuitionData.charge,
          chargeType : this.tuitionData.chargeType,
         // imageurl: ""

          
    
         })

        this.imageUrl = this.teacherData.imageurl.substring(this.tuitionData.imageurl.lastIndexOf('/')+1);
        this.modeofTeachingArr = this.tuitionData.modeofteaching;
      }
            
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


  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.selectedFile = file;
      this.selectedFileName = file.name.replace(/ /g, "_");
      // this.fileUploadError = '';
    }

  }

  onModeChange(event:any){
    //let temp = this.modeofTeachingArr.map((x:any)=>{ x.value == event.target.value ? x.checked = event.target.checked : x.checked });
     this.modeofTeachingArr.forEach((x:any)=>{
      if( x.value == event.target.value){
        x.checked = event.target.checked
      }
    })
    console.log(this.modeofTeachingArr)
    console.log(this.teacherForm.controls['modeofteaching'].value);
}


reuploadImage(){
  this.imageUrl = '';

}

submitTeacherForm() {
    this.submitted = true;
    console.log(this.teacherForm.value);
    if (this.teacherForm.valid){
      let payload = this.teacherForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'modeofteaching'){
          formData.append(key, (value).toString());
        }
        
      });
      formData.append('modeofteaching', JSON.stringify(this.modeofTeachingArr))
      if(this.selectedFileName){
        formData.append('image', this.selectedFile, this.selectedFileName);
      }

     // let id = this.teacherForm.controls['_id'].value;
      if(this.tuitionData == undefined){
     // formData.delete('_id');   
      this.teacherService.createteacher(formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this.router.navigate(['/dashboard/teacher/teacher-history'])
            this.authService.parentEmail(payload).subscribe((data: any) => {
              console.log(data, 'email')
            });
            this._toastrService.success('Your details are saved successfully')
          }

        }, error: ((err: any) => {
          let error = this.errHandler.handleError(err);
          //console.log(error)
          if (error.status == 401) {
            this._toastrService.error('Token Expired');
          }
          if (error.status == 500) {
            this._toastrService.error('Server Error.Failed to add parent');
          }

        })
      })
     }else{
      
      this.teacherService.updateteacher(this.tuitionData._id,formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this.router.navigate(['/dashboard/teacher/teacher-history'])
            this.authService.parentEmail(payload).subscribe((data: any) => {
              console.log(data, 'email')
            });
            this._toastrService.success('Your details are updated successfully')
          }

        }, error: ((err: any) => {
          let error = this.errHandler.handleError(err);
          //console.log(error)
          if (error.status == 401) {
            this._toastrService.error('Token Expired');
          }
          if (error.status == 500) {
            this._toastrService.error('Server Error.Failed to update parent');
          }

        })
      })
     }

    } else {
      return;
    }

  }



}
