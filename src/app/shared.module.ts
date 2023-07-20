import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,TooltipModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    ProgressSpinnerModule,
    InputNumberModule,
    
   
  ],
  exports:[
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,TooltipModule,
    InputTextModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
   
  ],
  providers: []
})

export class CustomSharedModule { }