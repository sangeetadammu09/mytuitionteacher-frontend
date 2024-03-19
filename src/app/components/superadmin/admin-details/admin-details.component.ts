import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../shared/services/admin.service';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { SocialMedia } from '../../../../assets/referencedata/socialmedia';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent {
  title = 'My Profile';
  breadcrumb :any;
  isEdited = false;
  user = JSON.parse(localStorage.getItem('user'));
  adminForm: FormGroup;
  adminData: any;
  get f(){ return this.adminForm.controls};
  submitted: boolean = false;
  selectedFile:any;
  selectedFileName ="";
  socialMediaList = SocialMedia.data;
  facebookUrl = '';
  instagramUrl = '';
  twitterUrl = '';
  linkedinUrl = '';

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router,
    private errHandler : ErrorhandlerService,private _toastrService : ToastrService) {
    this.adminForm = this.fb.group({
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
    const add = this.adminForm.get('socialLinks') as FormArray;
    add.push(this.fb.group({
      name:[''],
      url: ['']

    }))
  }

  deleteSocialGroup(index: number) {
    const add = this.adminForm.get('socialLinks') as FormArray;
    add.removeAt(index)
  }

  ngOnInit(): void {
    this.getAdminDetails();
    this.getRouteDetails();
  }

  getRouteDetails(){
    this.breadcrumb = this.router.url.replace('/','');
    this.breadcrumb = this.breadcrumb.split('/');
  }


  getAdminDetails(){
    // console.log(this.user, 'user');
    this.adminService.adminById(this.user.id).subscribe({next: (data:any)=>{
      if(data.status == 200){
       // this._toastrService.success('Profile successfully!');
       this.adminData = data.singleuser;
      // console.log(this.adminData, '--', JSON.parse(this.adminData.sociallinks));
       this.adminForm.patchValue({
        firstname: this.adminData.firstname,
        lastname: this.adminData.lastname,
        email: this.adminData.email,
        mobile: this.adminData.mobile,
        location: this.adminData.location== 'empty' ? '': this.adminData.location,
        role: this.adminData.role,
        password: this.adminData.password,
        cpass: this.adminData.cpass,
        imageurl: this.adminData.imageurl,
        isActive: this.adminData.isActive
      
      })

    
      if(this.adminData.sociallinks != 'empty'){
       this.populateData();
      }

      this.selectedFileName = this.adminData.imageurl == undefined ? '' : this.adminData.imageurl.substring(this.adminData.imageurl.indexOf('uploads/') + 1);
      
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
    const socialData = JSON.parse(this.adminData.sociallinks);
    console.log(socialData)
  
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
    this.adminForm.setControl('socialLinks', sformArray);
  
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
    console.log(this.adminForm.value);
    if(this.adminForm.valid){
      let payload = this.adminForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'socialLinks'){
          formData.append(key, (value).toString());
        }
      });
      formData.append('sociallinks', JSON.stringify(this.adminForm.controls['socialLinks'].value))
      if(this.selectedFile){
      formData.append('image', this.selectedFile, this.selectedFileName);
      }
      this.adminService.update(this.adminData._id, formData).subscribe({next: (data:any)=>{
        if(data.status == 200){
          this.getAdminDetails();
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