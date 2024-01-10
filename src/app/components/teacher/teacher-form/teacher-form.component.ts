import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../../shared/services/teacher.service';
import { States } from '../../../../assets/referencedata/states';
import { ModeofTeachingArr } from '../../../../assets/referencedata/modeofteaching';
import { ErrorhandlerService } from '../../../shared/services/errorhandler.service';
import { AuthService } from '../../../shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {

  addTeacherForm!: FormGroup;
  submitted: boolean = false;
  modeofTeachingArr = ModeofTeachingArr.data;
  modeValueArr: any =[];
  public visible = false;
  statesList = States.data;
  selectedFile:any;
  selectedFileName:string = "";
  modeOfTeachingArrayValue = [];


   // convenience getter for easy access to form fields
   get t() { return this.addTeacherForm.controls; };


  constructor(private fb : FormBuilder, private teacherService : TeacherService,  private router : Router,
    private toastrService : ToastrService, private errHandler : ErrorhandlerService,
    private authService : AuthService){

      this.addTeacherForm = this.fb.group({
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
        imageurl: [, Validators.required]
      
      })
  }

  ngOnInit(): void {
  
    this.addTeacherForm.patchValue({
      name : "Sangeeta",
      email : "sangeeta@gmail.com",
      contact : "8332895856",
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
   
  }

  checkPhoneEmail(event:any){
     console.log(event.target.value);
     let params= event.target.value;
     this.teacherService.checkPhoneEmail(params).subscribe({next : (data:any)=>{
         if(data.status == 409){
           console.log(data.message) 
         }
     },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this.toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this.toastrService.error('Server Error.Failed to add teacher');
        }
        
     })})
  }

   removeDuplicates(array){
    let output = []
    for(let item of array){ 
        if(!output.includes(item))
          output.push(item)
    }
    console.log(output)
    return output
    }

  onModeChange(event:any){
      //let temp = this.modeofTeachingArr.map((x:any)=>{ x.value == event.target.value ? x.checked = event.target.checked : x.checked });
       this.modeofTeachingArr.forEach((x:any)=>{
        if( x.value == event.target.value){
          x.checked = event.target.checked
        }
      })
      console.log(this.modeofTeachingArr)  
  }


  onFileSelect(event:any){
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.selectedFile = file;
      console.log(this.selectedFile)
      this.selectedFileName = file.name.replace(/ /g,"_");
      console.log(this.selectedFileName)
      
    }else{
    }
   
  }

  submitTeacherForm(){
    this.submitted = true;
    console.log(this.addTeacherForm.value)
    if(this.addTeacherForm.valid){
      let payload = this.addTeacherForm.value;
      let formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if(key !== 'modeofteaching'){
          formData.append(key, (value).toString());
        }
        
      });
      formData.append('modeofteaching', JSON.stringify(this.modeofTeachingArr))
      formData.append('image', this.selectedFile, this.selectedFileName);
      this.teacherService.createteacher(formData).subscribe({next: (data:any)=>{
        if(data.status == 200){
          $('#teacherModal').modal('show')
          this.authService.teacherEmail(payload).subscribe((data:any) => {
           console.log(data, 'email')
          });
          this.toastrService.success('Your details are saved successfully')
        }
        
      },error:((err:any) =>{
        let error =  this.errHandler.handleError(err);
        //console.log(error)
        if(error.status == 401) {
         this.toastrService.error('Token Expired');
        }
        if(error.status == 500){
         this.toastrService.error('Server Error.Failed to add teacher');
        }
        
     })})

    }else{
      return;
    }


  }

  closeTeacherConfimModal(){
    $('#teacherModal').modal('hide')
    this.router.navigate(['/'])
  }


}
