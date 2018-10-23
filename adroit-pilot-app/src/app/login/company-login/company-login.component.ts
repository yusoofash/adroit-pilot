import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(login_details) {
    this.loginService.loginCompany(login_details)
    .subscribe(res => {
      if (res['access_token']) {
        this.loginService.setLocalStorage(res['access_token']);
        alert('local storage set');
      }
    });
  }

}
