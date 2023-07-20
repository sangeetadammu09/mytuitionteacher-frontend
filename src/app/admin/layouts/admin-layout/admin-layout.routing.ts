import { Routes } from '@angular/router';
import { RegisteredTutorsComponent } from 'src/app/Pages/registered-tutors/registered-tutors.component';
import { SubadminComponent } from 'src/app/Pages/subadmin/subadmin.component';
import { TuitionsListComponent } from 'src/app/Pages/tuitions-list/tuitions-list.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


export const AdminLayoutRoutes: Routes = [
    
    { path:'listofteachers',canActivate:[AuthGuard] , component: RegisteredTutorsComponent},
    { path:'listoftuitions',canActivate:[AuthGuard] , component: TuitionsListComponent},
    { path:'listofsubadmins',canActivate:[AuthGuard] , component: SubadminComponent}

   
   
];
