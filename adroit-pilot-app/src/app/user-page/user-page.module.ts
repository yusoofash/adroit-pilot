import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserHomeComponent],
  exports: [
    UserHomeComponent
  ]
})
export class UserPageModule { }
