import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, AuthenticationService } from '../../services';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  response: string;
  constructor(private authService: AuthenticationService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
  }

  login(login_details) {
    this.loaderService.startLoader();
    const { email, password } = login_details;
    this.authService.loginCompany(email, password)
    .subscribe(res => {
      this.loaderService.stopLoader();
      if (res['access_token']) {
        this.router.navigate(['/company-home']);
      } else {
        this.response = res['msg'];
      }
    });
  }

}
