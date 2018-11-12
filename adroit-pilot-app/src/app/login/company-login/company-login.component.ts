import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  response: string;
  constructor(private loginService: LoginService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
  }

  login(login_details) {
    this.loaderService.startLoader();
    this.loginService.loginCompany(login_details)
    .subscribe(res => {
      this.loaderService.stopLoader();
      if (res['access_token']) {
        this.loginService.setLocalStorage(res['access_token']);
        this.router.navigate(['/user-home']);
      } else {
        this.response = res['msg'];
      }
    });
  }

}
