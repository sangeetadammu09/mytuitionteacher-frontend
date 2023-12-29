import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLayoutComponent } from './common-layout.component';
import { HomeComponent } from '../components/shared-components/home/home.component';
import { AboutComponent } from '../components/shared-components/about/about.component';
import { ContactComponent } from '../components/shared-components/contact/contact.component';
import { TeacherJobsComponent } from '../components/shared-components/teacher-jobs/teacher-jobs.component';
import { LoginComponent } from '../components/shared-components/login/login.component';
import { TeacherFormComponent } from '../components/shared-components/teacher-form/teacher-form.component';
import { ParentFormComponent } from '../components/shared-components/parent-form/parent-form.component';


const routes: Routes = [
     {
         path: '',
         component: CommonLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            {path: 'home', component: HomeComponent},
            {path: 'about', component: AboutComponent},
            {path: 'contact', component: ContactComponent},
            { path: 'teaching-jobs', component : TeacherJobsComponent},
            { path: 'login', component: LoginComponent},
            { path: 'teacher-form', component: TeacherFormComponent},
            { path: 'parent-form', component: ParentFormComponent}
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonLayoutRoutingModule {}
