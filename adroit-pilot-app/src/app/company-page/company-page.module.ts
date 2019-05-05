import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyHomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CompanyHomeComponent,
    SettingsComponent,
  ],
  declarations: [CompanyHomeComponent, SettingsComponent, UserSearchComponent]
})
export class CompanyPageModule { }
