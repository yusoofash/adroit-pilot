import { Component, OnInit } from '@angular/core';
import { LoaderService, AuthenticationService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  response: string;
  constructor(private authService: AuthenticationService,
    private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit() {
  }

  login(login_details) {
    this.loaderService.startLoader();
    const { email, password } = login_details;
    this.authService.loginUser(email, password)
    .subscribe(res => {
      this.loaderService.stopLoader();
      if (res['access_token']) {
        this.router.navigate(['/user-home']);
      } else {
        this.response = res['msg'];
      }
    });
  }

}
