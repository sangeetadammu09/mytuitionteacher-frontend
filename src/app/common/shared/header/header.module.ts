import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ]
})

export class CommonHeaderModule {}
