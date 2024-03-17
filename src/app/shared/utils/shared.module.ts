import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
   
  ],
  exports:[
    HttpClientModule,
    FormsModule,ReactiveFormsModule
   
  ],
  providers: []
})

export class SharedModule { }