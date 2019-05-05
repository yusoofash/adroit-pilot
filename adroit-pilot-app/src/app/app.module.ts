import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './signup/user-signup/user-signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { LoginTempleteComponent } from './login/login-templete/login-templete.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserPageModule } from './user-page/user-page.module';
import { SidebarComponent } from './navbar/sidebar/sidebar.component';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { CompanyPageModule } from './company-page/company-page.module';
import { SharedModule } from './shared/shared.module';
import { NguParallaxModule } from '@ngu/parallax';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';

@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    CompanySignupComponent,
    HomepageComponent,
    NavbarComponent,
    UserLoginComponent,
    CompanyLoginComponent,
    LoginTempleteComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserPageModule,
    CompanyPageModule,
    SharedModule,
    NguParallaxModule,
    ParallaxScrollModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
