import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { SidebarComponent } from './shared-components/sidebar/sidebar.component';
import { ComponentModule } from '../components/component.module';

@NgModule({
    imports: [CommonModule, LayoutRoutingModule, TranslateModule, 
            NgbDropdownModule, ComponentModule],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule {}
