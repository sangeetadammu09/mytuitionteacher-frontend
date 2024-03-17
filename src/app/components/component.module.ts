import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/utils/shared.module';
import { AboutComponent } from './shared-components/about/about.component';
import { ContactComponent } from './shared-components/contact/contact.component';
import { HomeComponent } from './shared-components/home/home.component';
import { RegisterComponent } from './shared-components/register/register.component';
import { LoginComponent } from './shared-components/login/login.component';
import { ParentDetailsComponent } from './parent/parent-details/parent-details.component';
import { ParentFeedbackComponent } from './parent/parent-feedback/parent-feedback.component';
import { ParentFormComponent } from './parent/parent-form/parent-form.component';
import { ParentHistoryComponent } from './parent/parent-history/parent-history.component';
import { RegisteredTutorsComponent } from './teacher/registered-tutors/registered-tutors.component';
import { TeacherFormComponent } from './teacher/teacher-form/teacher-form.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherdetailsComponent } from './teacher/teacherdetails/teacherdetails.component';
import { TeacherfeedbackComponent } from './teacher/teacherfeedback/teacherfeedback.component';
import { TeacherhistoryComponent } from './teacher/teacherhistory/teacherhistory.component';
import { ParentListComponent } from './parent/parent-list/parent-list.component';
import { AdminDetailsComponent } from './superadmin/admin-details/admin-details.component';
import { PaymentDetailsComponent } from './superadmin/payment-details/payment-details.component';
import { SubadminDetailsComponent } from './subadmin/subadmin-details/subadmin-details.component';
import { SubadminPaymentComponent } from './subadmin/subadmin-payment/subadmin-payment.component';
import { AdminListComponent } from './superadmin/admin-list/admin-list.component';
import { PageTitleComponent } from './shared-components/page-title/page-title.component';
import { TuitionListComponent } from './teacher/tuition-list/tuition-list.component';
import { FeedbackListComponent } from './superadmin/feedback-list/feedback-list.component';
import { ContactListComponent } from './superadmin/contact-list/contact-list.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,  
  ],
  declarations: [
    HomeComponent,ContactComponent,AboutComponent,LoginComponent,RegisterComponent,
    RegisteredTutorsComponent,TeacherFormComponent,ParentFormComponent,ParentDetailsComponent, TeacherListComponent, 
    ParentHistoryComponent, ParentFeedbackComponent, TeacherdetailsComponent, 
    TeacherfeedbackComponent, TeacherhistoryComponent, ParentListComponent, AdminDetailsComponent, PaymentDetailsComponent,
     SubadminDetailsComponent, SubadminPaymentComponent, AdminListComponent, PageTitleComponent, TuitionListComponent, FeedbackListComponent, ContactListComponent,NotFoundComponent
  ]
})

export class ComponentModule {}
