import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ParentDetailsComponent } from '../components/parent-details/parent-details.component';
import { TeacherListComponent } from '../components/teacher-list/teacher-list.component';
import { ParentHistoryComponent } from '../components/parent-history/parent-history.component';
import { ParentFeedbackComponent } from '../components/parent-feedback/parent-feedback.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'parent-details', pathMatch: 'prefix' },
            { path : 'parent-details', component: ParentDetailsComponent},
            { path : 'listofteachers', component: TeacherListComponent},
            { path : 'parent-history', component: ParentHistoryComponent},
            { path : 'parent-feedback', component: ParentFeedbackComponent},

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
