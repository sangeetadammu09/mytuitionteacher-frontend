import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonLayoutRoutes } from './common-layout.routing';
import { PagesModule } from 'src/app/Pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomSharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(CommonLayoutRoutes),
    NgbModule,NgxPaginationModule,PagesModule,
    CustomSharedModule
    
  ],
  declarations: []
})

export class CommonLayoutModule {}
