import { Routes } from '@angular/router';
import { AboutComponent } from 'src/app/Pages/about/about.component';
import { ContactComponent } from 'src/app/Pages/contact/contact.component';
import { HomeComponent } from 'src/app/Pages/home/home.component';
import { LoginComponent } from 'src/app/Pages/login/login.component';
import { ParentFormComponent } from 'src/app/Pages/parent-form/parent-form.component';
import { RegisterComponent } from 'src/app/Pages/register/register.component';
import { TeacherFormComponent } from 'src/app/Pages/teacher-form/teacher-form.component';
import { TeacherJobsComponent } from 'src/app/Pages/teacher-jobs/teacher-jobs.component';



export const CommonLayoutRoutes: Routes = [
    
    {path: 'contact',component: ContactComponent},
    {path: 'about',component: AboutComponent},
    {path: 'teaching-jobs',component: TeacherJobsComponent},
    {path: '',component: HomeComponent},
    { path: 'parent-form',component: ParentFormComponent},
    { path: 'teacher-form',component: TeacherFormComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
   
   
   
];
