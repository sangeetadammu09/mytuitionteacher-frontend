import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../app/shared/services/common.service';
import { ErrorhandlerService } from '../../../../app/shared/services/errorhandler.service';
import { ToastrService } from 'ngx-toastr';
import { SocialMedia } from '../../../../assets/referencedata/socialmedia';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.scss']
})
export class ParentDetailsComponent {

  title = 'My Profile';
  breadcrumb = ['Dashboard', 'Parent', 'My-Details'];
  isEdited = false;
  user = JSON.parse(localStorage.getItem('user'));
  parentForm: FormGroup;
  parentData: any;
  get f(){ return this.parentForm.controls};
  submitted: boolean = false;
  selectedFile:any;
  selectedFileName ="";
  socialMediaList = SocialMedia.data;
  facebookUrl = '';
  instagramUrl = '';
  twitterUrl = '';
  linkedinUrl = '';

  constructor(private fb: FormBuilder, private commonService: CommonService,private errHandler : ErrorhandlerService,private _toastrService : ToastrService) {
    this.parentForm = this.fb.group({
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
    const add = this.parentForm.get('socialLinks') as FormArray;
    add.push(this.fb.group({
      name:[''],
      url: ['']

    }))
  }

  deleteSocialGroup(index: number) {
    const add = this.parentForm.get('socialLinks') as FormArray;
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
       this.parentData = data.singleuser;
      // console.log(this.parentData, '--', JSON.parse(this.parentData.sociallinks));
       this.parentForm.patchValue({
        firstname: this.parentData.firstname,
        lastname: this.parentData.lastname,
        email: this.parentData.email,
        mobile: this.parentData.mobile,
        location: this.parentData.location== 'empty' ? '': this.parentData.location,
        role: this.parentData.role,
        password: this.parentData.password,
        cpass: this.parentData.cpass,
        imageurl: this.parentData.imageurl,
        isActive: this.parentData.isActive
      
      })

      if(this.parentData.sociallinks != 'empty'){
        this.populateData();
      }

      this.selectedFileName = this.parentData.imageurl == undefined ? '' : this.parentData.imageurl.substring(this.parentData.imageurl.indexOf('uploads/') + 1);
      
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
  
    const socialData = JSON.parse(this.parentData.sociallinks);
   
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
    this.parentForm.setControl('socialLinks', sformArray);
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
    console.log(this.parentForm.value);
    if(this.parentForm.valid){
      let payload = this.parentForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'socialLinks'){
          formData.append(key, (value).toString());
        }
      });
      formData.append('sociallinks', JSON.stringify(this.parentForm.controls['socialLinks'].value))
      if(this.selectedFile){
      formData.append('image', this.selectedFile, this.selectedFileName);
      }
      this.commonService.update(this.parentData._id, formData).subscribe({next: (data:any)=>{
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
