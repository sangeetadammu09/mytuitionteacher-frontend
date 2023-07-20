import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomSharedModule } from '../shared.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisteredTutorsComponent } from './registered-tutors/registered-tutors.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherJobsComponent } from './teacher-jobs/teacher-jobs.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { TuitionsListComponent } from './tuitions-list/tuitions-list.component';
import { SubadminComponent } from './subadmin/subadmin.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CustomSharedModule
    
  ],
  declarations: [
    HomeComponent,ContactComponent,AboutComponent,LoginComponent,RegisterComponent,
    RegisteredTutorsComponent,TeacherFormComponent,TeacherJobsComponent,ParentFormComponent, TuitionsListComponent, SubadminComponent
  ]
})

export class PagesModule {}
