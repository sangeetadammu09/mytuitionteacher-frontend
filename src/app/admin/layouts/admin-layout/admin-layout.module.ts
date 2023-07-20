import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomSharedModule } from '../../../shared.module';
import { PagesModule } from '../../../Pages/pages.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule,NgxPaginationModule,PagesModule,
    CustomSharedModule,
  ],
  declarations: []
})

export class AdminLayoutModule {}
