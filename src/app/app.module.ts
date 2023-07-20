import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { FixedPluginModule} from './admin/shared/fixedplugin/fixedplugin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AppRoutes } from './app-routing.module';

import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';

import { BrowserModule } from "@angular/platform-browser";
import {RadioButtonModule} from 'primeng/radiobutton';
import { AuthInterceptor } from "./auth.interceptor";
import { CommonLayoutComponent } from "./common/layout/common-layout/common-layout.component";

import { CommonFooterModule } from "./common/shared/footer/footer.module";
import { CommonNavbarModule } from "./common/shared/navbar/navbar.module";
import { AdminFooterModule } from "./admin/shared/footer/footer.module";
import { AdminNavbarModule } from "./admin/shared/navbar/navbar.module";
import { AdminSidebarModule } from "./admin/shared/sidebar/sidebar.module";



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CommonLayoutComponent
  ],
  imports: [
    BrowserModule,RadioButtonModule,CommonNavbarModule,
    BrowserAnimationsModule,CommonFooterModule,
    AdminSidebarModule,AdminNavbarModule,AdminFooterModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    
    FixedPluginModule,HttpClientModule, NgxPaginationModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 3 seconds
      progressBar: true,
      positionClass: "toast-top-center"
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
