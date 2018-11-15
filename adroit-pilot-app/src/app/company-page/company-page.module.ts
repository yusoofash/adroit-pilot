import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CompanyHomeComponent,
  ],
  declarations: [CompanyHomeComponent]
})
export class CompanyPageModule { }
