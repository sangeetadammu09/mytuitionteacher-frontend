import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonLayoutComponent } from './common-layout.component';
import { HomeComponent } from '../components/shared-components/home/home.component';
import { AboutComponent } from '../components/shared-components/about/about.component';
import { ContactComponent } from '../components/shared-components/contact/contact.component';
import { LoginComponent } from '../components/shared-components/login/login.component';
import { RegisterComponent } from '../components/shared-components/register/register.component';
import { ParentFormComponent } from '../components/parent/parent-form/parent-form.component';
import { TeacherFormComponent } from '../components/teacher/teacher-form/teacher-form.component';
import { ParentListComponent } from '../components/parent/parent-list/parent-list.component';

const routes: Routes = [
     {
         path: '',
         component: CommonLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            {path: 'home', component: HomeComponent},
            {path: 'about', component: AboutComponent},
            {path: 'contact', component: ContactComponent},
            { path: 'teaching-jobs', component : ParentListComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
           
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonLayoutRoutingModule {}
