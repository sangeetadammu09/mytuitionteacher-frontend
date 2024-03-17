import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { ParentService } from '../../../shared/services/parent.service';
import { States } from '../../../../assets/referencedata/states';
import { Board } from '../../../../assets/referencedata/board';
import { Grade } from '../../../../assets/referencedata/grade';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { CommonService } from '../../../../app/shared/services/common.service';
import { ModeofTeachingArr } from '../../../../assets/referencedata/modeofteaching';
import { MasterService } from '../../../../app/shared/services/master.service';

declare var $: any;
@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {

  parentForm!: FormGroup;
  submitted: boolean = false;
  public visible = false;
  formattedaddress: any;
  options: any;
  parentData :any;
  statesList = States.data;
  boardList = Board.data;
  gradeList = Grade.data;
  modeofTeachingArr = ModeofTeachingArr.data;
  selectedFile: any;
  tuitionData :any;
  selectedFileName = "";
  title = 'Tuition Form';
  breadcrumb = ['Dashboard', 'Parent', 'Tuition Form'];
  user = JSON.parse(localStorage.getItem('user'));
  parentSubmitBtnText = 'Submit';
  imageUrl = '';
  cityList :any[] = [];
  disableSelectCityField = false;

  // convenience getter for easy access to form fields
  get p() { return this.parentForm.controls; };

  constructor(private fb: FormBuilder, private parentService: ParentService,private commonService: CommonService,
    private authService: AuthService, private router: Router, private errHandler: ErrorhandlerService,
    private _toastrService: ToastrService, private masterService: MasterService) {
    this.parentForm = this.fb.group({
      parentid: [''],
      name: [''],
      email: [''],
      contact: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      lookingfor: ['', Validators.required],
      grade: ['', Validators.required],
      board: ['', Validators.required],
      subjects: ['', Validators.required],
      details: [''],
      modeofteaching: [{id: 1, label: 'Home', value: 'home', checked: true}, Validators.required],
      days: ['', Validators.required],
      hours: ['', Validators.required],
      time: ['', Validators.required],
      gender: ['', Validators.required],
      budget: ['', [Validators.required, Validators.pattern('^[0-9,]*$')]],
      budgettype: ['', Validators.required],
      isActive : [true],
      status : ['open'],
      imageurl: ['']

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
       this.parentData = data.singleuser;   
       if(this.tuitionData == undefined && this.parentData){
       this.parentForm.patchValue({
        parentid: this.parentData._id,
        name: this.parentData.firstname +' '+ this.parentData.lastname,
        email : this.parentData.email,
        contact: this.parentData.mobile,
        // location: "HSR Layout",
        // state: "Karnataka",
        // city: "Bangalore",
        // lookingfor: "tutor", 
        // grade: "Class 4",
        // board: "CBSE",
        // subjects: "maths,science",
        // details: 'looking for teacher',
        // //modeofteaching: "home",
        // days: "5",
        // hours: "1.5hours",
        // time: "5pm",
        // gender: "female",
        // budget: "5000",
        // budgettype: "per month"
  
       })
      }else{
       
        this.parentSubmitBtnText = "Update";
        this.parentForm.patchValue({
          parentid: this.tuitionData.parentid,
          name: this.tuitionData.name,
          email : this.tuitionData.email,
          contact: this.tuitionData.mobile,
          location: this.tuitionData.location,
          state: this.tuitionData.state,
          city: this.tuitionData.city,
          lookingfor: this.tuitionData.lookingfor,
          grade: this.tuitionData.grade,
          board: this.tuitionData.board,
          subjects: this.tuitionData.subjects,
          details: this.tuitionData.details,
          days: this.tuitionData.days,
          hours: this.tuitionData.hours,
          time: this.tuitionData.time,
          gender: this.tuitionData.gender,
          budget: this.tuitionData.budget,
          budgettype: this.tuitionData.budgettype,
          isActive : this.tuitionData.isActive,
          status : this.tuitionData.status,
         // imageurl: this.tuitionData.imageurl
    
         })

        this.imageUrl = this.parentData.imageurl.substring(this.tuitionData.imageurl.lastIndexOf('/')+1);
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

  fetchCityList(value:any){
    let cityList = this.statesList.filter((x:any)=> x.name == value);
    this.cityList = cityList[0].cities
    // console.log('City', this.cityList)
     if(cityList[0].union == true){
      this.disableSelectCityField = true;
      this.parentForm.controls['city'].setValue('')
     // this.parentForm.get('city').disable();
    }else{
      //this.parentForm.get('city').enable();
      this.disableSelectCityField = false;

      }
     
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
    console.log(this.parentForm.controls['modeofteaching'].value);
}


reuploadImage(){
  this.imageUrl = '';

}

  submitParentForm() {
    this.submitted = true;
    console.log(this.parentForm.value);
    if (this.parentForm.valid){
      let payload = this.parentForm.value;
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

     // let id = this.parentForm.controls['_id'].value;
      if(this.tuitionData == undefined){
     // formData.delete('_id');   
      this.parentService.createparent(formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this.router.navigate(['/dashboard/parent/parent-history'])
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
      
      this.parentService.updateparent(this.tuitionData._id,formData).subscribe({next: (data: any) => {
          if (data.status == 200) {
          //  $('#parentModal').modal('show')
            this.router.navigate(['/dashboard/parent/parent-history'])
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


  closeParentConfimModal() {
    $('#parentModal').modal('hide')
   // this.router.navigate(['/'])
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address
  }

}
