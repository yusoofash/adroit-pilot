import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CompanySearchComponent } from './company-search/company-search.component';
import { CompanyPredictComponent } from './company-predict/company-predict.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [UserHomeComponent, CompanySearchComponent, CompanyPredictComponent, AccountComponent],
  exports: [
    UserHomeComponent,
    CompanyPredictComponent,
    CompanySearchComponent,
  ]
})
export class UserPageModule { }
