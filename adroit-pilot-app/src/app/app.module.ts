import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UserSignupComponent } from './signup/user-signup/user-signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { LoginTempleteComponent } from './login/login-templete/login-templete.component';
import { ConfirmEqualDirective } from './signup/confirm-equal.directive';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './common/popup/popup.component';
import { UserPageComponent } from './user-page/user-page.component';

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
    ConfirmEqualDirective,
    PopupComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [
    PopupComponent,
  ],
  providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
