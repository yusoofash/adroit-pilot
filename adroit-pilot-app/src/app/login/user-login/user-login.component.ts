import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(login_details) {
    this.loginService.loginCompany(login_details)
    .subscribe(res => {
      if (res['access_token']) {
        this.loginService.setLocalStorage(res['access_token']);
        this.router.navigate(['/user-home']);
      }
    });
  }

}
