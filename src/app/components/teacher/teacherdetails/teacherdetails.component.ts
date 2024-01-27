import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../app/shared/services/common.service';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { SocialMedia } from '../../../../assets/referencedata/socialmedia';

@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.component.html',
  styleUrls: ['./teacherdetails.component.scss']
})
export class TeacherdetailsComponent {
  title = 'My Profile';
  breadcrumb = ['Dashboard', 'Teacher', 'My-Details'];
  isEdited = false;
  user = JSON.parse(localStorage.getItem('user'));
  teacherForm: FormGroup;
  teacherData: any;
  get f(){ return this.teacherForm.controls};
  submitted: boolean = false;
  selectedFile:any;
  selectedFileName ="";
  socialMediaList = SocialMedia.data;
  facebookUrl = '';
  instagramUrl = '';
  twitterUrl = '';
  linkedinUrl = '';

  constructor(private fb: FormBuilder, private commonService: CommonService,private errHandler : ErrorhandlerService,private _toastrService : ToastrService) {
    this.teacherForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ['', Validators.required],
      role: ['', Validators.required],
      password: [''],
      cpass: [''],
      imageurl: [, Validators.required],
      isActive: [true],
      socialLinks : this.fb.array([]),
      //{name: 'facebook', url: 'https://www.facebook.com/'}
    })
  }

  addNewSocialGroup(){
    const add = this.teacherForm.get('socialLinks') as FormArray;
    add.push(this.fb.group({
      name:[''],
      url: ['']

    }))
  }

  deleteSocialGroup(index: number) {
    const add = this.teacherForm.get('socialLinks') as FormArray;
    add.removeAt(index)
  }

  ngOnInit(): void {
    this.getParentDetails();
  }


  getParentDetails(){
    // console.log(this.user, 'user');
    this.commonService.userById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // this._toastrService.success('Profile successfully!');
       this.teacherData = data.singleuser;
      // console.log(this.teacherData, '--', JSON.parse(this.teacherData.sociallinks));
       this.teacherForm.patchValue({
        firstname: this.teacherData.firstname,
        lastname: this.teacherData.lastname,
        email: this.teacherData.email,
        mobile: this.teacherData.mobile,
        location: this.teacherData.location== 'empty' ? '': this.teacherData.location,
        role: this.teacherData.role,
        password: this.teacherData.password,
        cpass: this.teacherData.cpass,
        imageurl: this.teacherData.imageurl,
        isActive: this.teacherData.isActive
      
      })

      if(this.teacherData.sociallinks != 'empty'){
        this.populateData();
      }

      this.selectedFileName = this.teacherData.imageurl == undefined ? '' : this.teacherData.imageurl.substring(this.teacherData.imageurl.indexOf('uploads/') + 1);
      
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


  populateData(){
    // populating data
  
    const socialData = JSON.parse(this.teacherData.sociallinks);
   
    socialData.forEach((x:any)=>{
      if(x.name == 'facebook'){
        this.facebookUrl = x.url
      }
      if(x.name == 'instagram'){
        this.instagramUrl = x.url
      }
      if(x.name == 'linkedin'){
        this.linkedinUrl = x.url
      }
      if(x.name == 'twitter'){
        this.twitterUrl = x.url
      }
      
    })

    
    const data = socialData.map(x => {
      return this.fb.group({
        name: [x.name],
        url: [x.url],
      })
    });

    const sformArray: FormArray = this.fb.array(data);
    this.teacherForm.setControl('socialLinks', sformArray);
  }


  onFileSelect(event:any){
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.selectedFile = file;
      this.selectedFileName = file.name.replace(/ /g,"_");
      // this.fileUploadError = '';
    }
   
  }


  updateDetails(){
    this.submitted = true;
    console.log(this.teacherForm.value);
    if(this.teacherForm.valid){
      let payload = this.teacherForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'socialLinks'){
          formData.append(key, (value).toString());
        }
      });
      formData.append('sociallinks', JSON.stringify(this.teacherForm.controls['socialLinks'].value))
      if(this.selectedFile){
      formData.append('image', this.selectedFile, this.selectedFileName);
      }
      this.commonService.update(this.teacherData._id, formData).subscribe({next: (data:any)=>{
        if(data.status == 200){
          this.getParentDetails();
          this._toastrService.success('Your details are updated successfully')
          this.isEdited = false;
        }
        
      },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this._toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this._toastrService.error('Server Error.Failed to add parent');
        }
        
     })})
     
      

    }else{
      return;
    }
  }



}
