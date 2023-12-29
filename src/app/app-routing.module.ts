import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
    },
    {
        path: '',
        loadChildren: () => import('./common-layout/common-layout.module').then((m) => m.CommonLayoutModule)
    },
   // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule) },
   // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
