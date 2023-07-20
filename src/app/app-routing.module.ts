import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { CommonLayoutComponent } from './common/layout/common-layout/common-layout.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'home',pathMatch: 'full'}, 
  // {path:'',component:LoginComponent},
  // {path:'register',component:RegisterComponent},
  //canActivate:[AuthGuard],
  {
    path: 'admin',
    component: AdminLayoutComponent,
   
    children: [
        {
      path: '',loadChildren: () => import('./admin/layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
        {
      path: '',loadChildren: () => import('./common/layout/common-layout/common-layout.module').then(x => x.CommonLayoutModule)
        }
       ]
},
  // {
  //      path: 'cco',
  //      component: CcoLayoutComponent,
  //      canActivate:[AuthGuard],
  //      children: [
  //       {
  //       path: '',loadChildren: () => import('./Cco/layouts/cco-layout/cco-layout.module').then(x => x.CcoLayoutModule)
  //       }
  //      ]
  // },

  {path: '**',redirectTo: 'login'}
]
