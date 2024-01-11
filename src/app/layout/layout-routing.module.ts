import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ParentDetailsComponent } from '../components/parent/parent-details/parent-details.component';
import { ParentFeedbackComponent } from '../components/parent/parent-feedback/parent-feedback.component';
import { ParentHistoryComponent } from '../components/parent/parent-history/parent-history.component';
import { TeacherListComponent } from '../components/teacher/teacher-list/teacher-list.component';
import { TeacherhistoryComponent } from '../components/teacher/teacherhistory/teacherhistory.component';
import { TeacherfeedbackComponent } from '../components/teacher/teacherfeedback/teacherfeedback.component';
import { ParentListComponent } from '../components/parent/parent-list/parent-list.component';
import { TeacherdetailsComponent } from '../components/teacher/teacherdetails/teacherdetails.component';
import { AdminDetailsComponent } from '../components/superadmin/admin-details/admin-details.component';
import { PaymentDetailsComponent } from '../components/superadmin/payment-details/payment-details.component';
import { AdminListComponent } from '../components/superadmin/admin-list/admin-list.component';
import { ParentFormComponent } from '../components/parent/parent-form/parent-form.component';
import { TeacherFormComponent } from '../components/teacher/teacher-form/teacher-form.component';

const routes: Routes = [
    {
        path: 'parent',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'my-profile', pathMatch: 'prefix' },
            { path : 'my-profile', component: ParentDetailsComponent},
            { path : 'teachers-list', component: TeacherListComponent}, // list of teachers available
            { path : 'parent-history', component: ParentHistoryComponent},
            { path : 'parent-feedback', component: ParentFeedbackComponent},
            { path: 'parent-form', component: ParentFormComponent}

        ]
    },
    {
        path: 'teacher',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'my-profile', pathMatch: 'prefix' },
            { path : 'my-profile', component: TeacherdetailsComponent},
            { path : 'tuitions-list', component: ParentListComponent}, // list of tuitions jobs available
            { path : 'teacher-history', component: TeacherhistoryComponent},
            { path : 'teacher-feedback', component: TeacherfeedbackComponent},
            { path: 'teacher-form', component: TeacherFormComponent}

        ]
    },
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'my-profile', pathMatch: 'prefix' },
            { path : 'my-profile', component: AdminDetailsComponent},
            { path : 'tuition-list', component: ParentListComponent}, // list of tuitions jobs available
            { path : 'teacher-list', component: TeacherhistoryComponent},
            { path : 'admins-list', component: AdminListComponent},
            { path : 'payment-list', component: PaymentDetailsComponent},

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
