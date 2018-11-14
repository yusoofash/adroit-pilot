import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { BlockUiComponent, LoaderComponent } from './common';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { CompanyPageModule } from './company-page/company-page.module';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

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
    BlockUiComponent,
    LoaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UserPageModule,
    CompanyPageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
