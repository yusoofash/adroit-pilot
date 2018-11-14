import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CompanyHomeComponent,
  ],
  declarations: [CompanyHomeComponent]
})
export class CompanyPageModule { }
