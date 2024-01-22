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

declare var $: any;
@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.css']
})
export class ParentFormComponent implements OnInit {

  addParentForm!: FormGroup;
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
  selectedFileName = "";
  title = 'Tuition Form';
  breadcrumb = ['Dashboard', 'Parent', 'Tuition Form'];
  user = JSON.parse(localStorage.getItem('user'));

  // convenience getter for easy access to form fields
  get p() { return this.addParentForm.controls; };

  constructor(private fb: FormBuilder, private parentService: ParentService,private commonService: CommonService,
    private authService: AuthService, private router: Router, private errHandler: ErrorhandlerService,
    private _toastrService: ToastrService) {
    this.addParentForm = this.fb.group({
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
      modeofteaching: [, Validators.required],
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
    // console.log(this.user, 'user');
    this.commonService.userById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // this._toastrService.success('Profile successfully!');
       this.parentData = data.singleuser;
       console.log(this.parentData)
       this.addParentForm.patchValue({
        parentid: this.parentData._id,
        name: this.parentData.firstname +' '+ this.parentData.lastname,
        email : this.parentData.email,
        contact: this.parentData.mobile,
        location: "",
        state: "Andhra Pradesh",
        city: "Vizag",
        lookingfor: "tutor",
        grade: "Class 4",
        board: "CBSE",
        subjects: "maths,science",
        details: 'looking for teacher',
        modeofteaching: "home",
        days: "5",
        hours: "1.5hours",
        time: "5pm",
        gender: "female",
        budget: "5000",
        budgettype: "per month"
  
      })
            
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

  submitParentForm() {
    this.submitted = true;
    console.log(this.addParentForm.value)
    if (this.addParentForm.valid){
      let payload = this.addParentForm.value;
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
      
      this.parentService.createparent(formData).subscribe({
        next: (data: any) => {
          if (data.status == 200) {
            $('#parentModal').modal('show')
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
