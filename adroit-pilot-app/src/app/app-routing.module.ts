import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSignupComponent } from './signup/user-signup/user-signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserHomeComponent } from './user-page/home/home.component';
import { CompanySearchComponent } from './user-page/company-search/company-search.component';
import { CompanyPredictComponent } from './user-page/company-predict/company-predict.component';
import { CompanyHomeComponent } from './company-page/home/home.component';
import { SettingsComponent } from './company-page/settings/settings.component';
import { UserSearchComponent } from './company-page/user-search/user-search.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { PageNotFoundComponent } from './common';
import { UserType } from './models';
import { CompanyPageComponent } from './user-page/company-page/company-page.component';
import { AccountComponent } from './user-page/account/account.component';

export const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'user-signup', component: UserSignupComponent },
  { path: 'company-signup', component: CompanySignupComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'company-login', component: CompanyLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard], data: { role: UserType.USER } },
  { path: 'user-account', component: AccountComponent, canActivate: [AuthGuard], data: { role: UserType.USER } },
  { path: 'company/:id', component: CompanyPageComponent },
  { path: 'company-search', component: CompanySearchComponent, canActivate: [AuthGuard], data: { role: UserType.USER } },
  { path: 'company-predict', component: CompanyPredictComponent, canActivate: [AuthGuard], data: { role: UserType.USER } },
  { path: 'company-home', component: CompanyHomeComponent, canActivate: [AuthGuard], data: { role: UserType.COMPANY } },
  { path: 'company-settings', component: SettingsComponent, canActivate: [AuthGuard], data: { role: UserType.COMPANY } },
  { path: 'search-users', component: UserSearchComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
