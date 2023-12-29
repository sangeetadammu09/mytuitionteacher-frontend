import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';
import { CommonLayoutComponent } from './common-layout.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import { ComponentModule } from '../components/component.module';


@NgModule({
    imports: [CommonModule, CommonLayoutRoutingModule,TranslateModule,NgbDropdownModule, ComponentModule],
    declarations: [CommonLayoutComponent,SidebarComponent, HeaderComponent]
})
export class CommonLayoutModule {}
