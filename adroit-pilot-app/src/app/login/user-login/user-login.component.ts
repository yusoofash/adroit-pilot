import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { LoaderService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

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
