import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSignupComponent } from './signup/user-signup/user-signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { UserHomeComponent } from './user-page/home/home.component';
import { CompanyHomeComponent } from './company-page/home/home.component';
import { SettingsComponent } from './company-page/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { PageNotFoundComponent } from './common';
import { UserType } from './models';

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
  { path: 'company-home', component: CompanyHomeComponent, canActivate: [AuthGuard], data: { role: UserType.COMPANY } },
  { path: 'company-settings', component: SettingsComponent, canActivate: [AuthGuard], data: { role: UserType.COMPANY } },
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
