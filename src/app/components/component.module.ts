import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubadminComponent } from './subadmin/subadmin.component';
import { SharedModule } from '../shared/utils/shared.module';
import { AboutComponent } from './shared-components/about/about.component';
import { ContactComponent } from './shared-components/contact/contact.component';
import { HomeComponent } from './shared-components/home/home.component';
import { ParentFormComponent } from './shared-components/parent-form/parent-form.component';
import { RegisterComponent } from './shared-components/register/register.component';
import { RegisteredTutorsComponent } from './shared-components/registered-tutors/registered-tutors.component';
import { TeacherFormComponent } from './shared-components/teacher-form/teacher-form.component';
import { TeacherJobsComponent } from './shared-components/teacher-jobs/teacher-jobs.component';
import { TuitionsListComponent } from './shared-components/tuitions-list/tuitions-list.component';
import { LoginComponent } from './shared-components/login/login.component';
import { ParentDetailsComponent } from './parent-details/parent-details.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { ParentHistoryComponent } from './parent-history/parent-history.component';
import { ParentFeedbackComponent } from './parent-feedback/parent-feedback.component';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,  
  ],
  declarations: [
    HomeComponent,ContactComponent,AboutComponent,LoginComponent,RegisterComponent,
    RegisteredTutorsComponent,TeacherFormComponent,TeacherJobsComponent,ParentFormComponent,
    TuitionsListComponent, SubadminComponent, ParentDetailsComponent, TeacherListComponent, 
    ParentHistoryComponent, ParentFeedbackComponent
  ]
})

export class ComponentModule {}
