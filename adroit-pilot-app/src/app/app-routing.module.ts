import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSignupComponent } from './signup/user-signup/user-signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { HomeComponent } from './user-page/home/home.component';
import { RouterModule, Routes } from '@angular/router';

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
  { path: 'user-home', component: HomeComponent }
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
